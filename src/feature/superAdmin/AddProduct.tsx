import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { showAlert } from '../../utils/alert/Alert';
import { RootStackParamList } from '../../navigation/Navigations';
import { emptyProduct, Product } from '../../data/models/Product';
import { BASE_URL } from '../../utils/constants';

const AddProduct: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [errors, setErrors] = useState({
    name: '',
    deviceModel: '',
    company: '',
    description: '',
  });

  useEffect(() => {
    (async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setToken(savedToken || '');
    })();
  }, []);

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Gallery permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateField = (key: keyof Product, value: string): string => {
    const trimmed = value.trim();
    const maxLength = key === 'description' ? 200 : 30;
    if (!trimmed && (key === 'name' || key === 'deviceModel')) {
      return `${key === 'name' ? 'Name' : 'Device Model'} is required`;
    }
    if (trimmed.length > maxLength) {
      return `${key.charAt(0).toUpperCase() + key.slice(1)} cannot exceed ${maxLength} characters`;
    }
    return '';
  };

  const handleInputChange = (key: keyof Product, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: validateField('name', formData.name),
      deviceModel: validateField('deviceModel', formData.deviceModel),
      company: validateField('company', formData.company),
      description: validateField('description', formData.description),
    };
  
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((err) => err);
    if (hasError) return;
  
    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('deviceModel', formData.deviceModel.trim());
    data.append('company', formData.company.trim());
    data.append('description', formData.description.trim());
  
    // Correct way to append image
    if (image) {
      const fileName = image.split('/').pop()!;
      const fileType = fileName?.split('.').pop() || 'jpeg';
  
      const imageData = {
        uri: image,
        name: fileName,
        type: `image/${fileType}`,
      };

      const response = await fetch(image);
      const blob = await response.blob();
      data.append('image', blob, fileName);
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/product`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201 || response.status === 200) {
        showAlert('Success', 'Product added successfully');
        navigation.goBack();
      } else {
        showAlert('Error', 'Unexpected response');
      }
    } catch (err: any) {
      console.error('Add product error:', err.response?.data || err.message);
      showAlert('Error', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="Add Product" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.imagePicker} onPress={() => setShowImageOptions(true)}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePlaceholder}>Tap to upload product image</Text>
            )}
          </TouchableOpacity>

          <AppInput
            placeholder="Product Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={errors.name}
          />
          <AppInput
            placeholder="Device Model"
            value={formData.deviceModel}
            onChangeText={(text) => handleInputChange('deviceModel', text)}
            error={errors.deviceModel}
          />
          <AppInput
            placeholder="Company"
            value={formData.company}
            onChangeText={(text) => handleInputChange('company', text)}
            error={errors.company}
          />
          <AppInput
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            error={errors.description}
            multiline
            numberOfLines={4}
          />
          <AppButton title="Add Product" onPress={handleSubmit} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={showImageOptions} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Image</Text>
            <Pressable onPress={() => { setShowImageOptions(false); openCamera(); }}>
              <Text style={styles.modalButton}>📷 Take Photo</Text>
            </Pressable>
            <Pressable onPress={() => { setShowImageOptions(false); openGallery(); }}>
              <Text style={styles.modalButton}>🖼️ Choose from Gallery</Text>
            </Pressable>
            <Pressable onPress={() => setShowImageOptions(false)}>
              <Text style={[styles.modalButton, { color: 'red' }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  imagePicker: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButton: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#007AFF',
  },
});
