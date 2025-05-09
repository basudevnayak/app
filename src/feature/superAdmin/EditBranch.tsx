
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { showAlert } from '../../utils/alert/Alert';
import { BASE_URL } from '../../utils/constants';
import { Logger } from '../../utils/logger';

import { RootStackParamList } from '../../navigation/Navigations';



const EditBranch = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditBranch'>>();
  const { branch } = route.params;

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    postalAddress: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const [nameError, setNameError] = useState('');
  const [ifscError, setIfscError] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then((savedToken) => {
      setToken(savedToken || '');
    });

    setFormData({
      name: branch.name || '',
      code: branch.code || '',
      postalAddress: branch.postalAddress || '',
      city: branch.city || '',
      state: branch.state || '',
      pinCode: branch.pinCode || '',
    });
  }, [branch]);

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === 'name') setNameError('');
    if (key === 'code') setIfscError('');
  };

  const handleUpdate = async () => {
    const trimmedName = formData.name.trim();
    const trimmedIfsc = formData.code.trim();

    if (!trimmedName || !trimmedIfsc) {
      if (!trimmedName) setNameError('Branch name is required');
      if (!trimmedIfsc) setIfscError('IFSC code is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/branches/${branch.uuid}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          code: trimmedIfsc,
          postalAddress: formData.postalAddress,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          bankUuid: branch.bankUuid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showAlert('Success', 'Branch updated successfully');
        navigation.goBack();
      } else {
        showAlert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Logger.error('Branch update failed:', error);
      showAlert('Error', 'Failed to update branch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="Edit Branch" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <AppInput
            placeholder="Branch Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={nameError}
          />
          <AppInput
            placeholder="IFSC Code"
            value={formData.code}
            onChangeText={(text) => handleInputChange('code', text)}
            error={ifscError}
          />
          <AppInput
            placeholder="Address"
            value={formData.postalAddress}
            onChangeText={(text) => handleInputChange('postalAddress', text)}
            multiline
          />
          <AppInput
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => handleInputChange('city', text)}
          />
          <AppInput
            placeholder="Pincode"
            value={formData.pinCode}
            onChangeText={(text) => handleInputChange('pinCode', text)}
            keyboardType="numeric"
          />
          <AppInput
            placeholder="State"
            value={formData.state}
            onChangeText={(text) => handleInputChange('state', text)}
          />
          <AppButton title="Update Branch" onPress={handleUpdate} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditBranch;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

