import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { RootStackParamList } from '../../navigation/Navigations';
import { KEYS } from '../../utils/constants';
import { headerStyles } from '../../utils/theme';
import { showAlert } from '../../utils/alert/Alert';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorageHelper from '../../utils/data/local/AsyncStorageHelper';
import { Product } from '../../data/models/Product';
import { featureService } from '../../data/service/ApiServiceFactory';

const AddFeature = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState({
    name: '',
    description: '',
    input: false, // checkbox state now part of form
  });

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const trimmedName = form.name.trim();
    const trimmedDesc = form.description.trim();

    if (!trimmedName || !trimmedDesc) {
      showAlert('Validation Error', 'Feature name and description are required.');
      return;
    }

    try {
      const selectedProduct = await AsyncStorageHelper.getItem<Product>(KEYS.SELECTED_PRODUCT);
      const payload = {
        productUuid: selectedProduct.uuid,
        name: trimmedName,
        description: trimmedDesc,
        input: form.input,
      };

      const response = await featureService.create(payload);
      if (response.statusCode === 200 && response.data) {
        showAlert('Success', 'Feature added successfully');
        navigation.goBack();
      }
    } catch (err: any) {
      console.error('Feature create error:', err.response?.data || err.message);
      showAlert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={headerStyles.mainContainer}>
      <CommonHeader title="Add Feature" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <AppInput
            placeholder="Feature Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <AppInput
            placeholder="Short Description"
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />

          {/* Checkbox toggle */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => handleChange('input', !form.input)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={form.input ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color={form.input ? '#007AFF' : '#aaa'}
            />
            <Text style={styles.checkboxLabel}>Is feature required input</Text>
          </TouchableOpacity>

          <AppButton title="Add Feature" onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});
