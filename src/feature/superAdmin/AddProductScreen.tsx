import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import CommonHeader from '../../component/CommonHeader';
import { showAlert } from '../../utils/alert/Alert';
import { BASE_URL } from '../../utils/constants';

const AddProductScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    Name: '',
    DeviceModel: '',
    Company: '',
    Description: '',
  });

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setToken(savedToken || '');
    };
    fetchToken();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.Name || !formData.DeviceModel) {
      showAlert('Validation Error', 'Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/product`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.data?.success) {
        showAlert('Success', 'Product added successfully');
        navigation.goBack();
      } else {
        showAlert('Error', 'Unexpected response from server');
      }
    } catch (error: any) {
      console.error('Error adding product:', error.response?.data || error.message);
      showAlert('Error', 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <CommonHeader title="Add Product" onBackPress={() => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {Object.entries(formData).map(([field, value]) => (
              <AppInput
                key={field}
                placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()}
                value={value}
                onChangeText={(text) => handleInputChange(field, text)}
              />
            ))}
            <AppButton title="Submit" onPress={handleSubmit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    marginTop: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
});
