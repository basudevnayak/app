import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CommonHeader from '../../component/CommonHeader';
import { showAlert } from '../../utils/alert/Alert';
import { bankService } from '../../data/service/ApiServiceFactory';


const schema = Yup.object().shape({
  name: Yup.string().required('Bank Name is required'),
  bankCode: Yup.string().required('Bank Code is required'),
  postalAddress: Yup.string().required('Postal Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pinCode: Yup.string()
    .required('Pin Code is required')
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Pin Code'),
});

const AddBank = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      bankCode: '',
      postalAddress: '',
      city: '',
      state: '',
      pinCode: '',
    },
  });

  useEffect(() => {
    const fetchToken = async () => {
      const val = await AsyncStorage.getItem('token');
      if (val) setToken(val);
    };
    fetchToken();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await bankService.create(data);

      if (response) {
        showAlert('Success', 'Bank added successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        showAlert('Error', 'Unexpected response');
      }
    } catch (err: any) {
      showAlert('Error', err?.message || 'Failed to add bank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CommonHeader title="Add Bank" showBackButton onBackPress={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {(['name', 'bankCode', 'postalAddress', 'city', 'state', 'pinCode'] as const).map((field) => (
            <View key={field}>
              <Controller
                control={control}
                name={field}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder={field
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                    onChangeText={onChange}
                    value={value}
                    keyboardType={field === 'pinCode' ? 'numeric' : 'default'}
                    multiline={field === 'postalAddress'}
                  />
                )}
              />
              {errors[field] && (
                <Text style={styles.errorText}>{(errors as any)[field]?.message}</Text>
              )}
            </View>
          ))}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Submit</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddBank;
