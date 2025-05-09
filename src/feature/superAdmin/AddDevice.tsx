import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import CommonHeader from '../../component/CommonHeader';
import { showAlert } from '../../utils/alert/Alert';
import { headerStyles } from '../../utils/theme';
import { Bank } from '../../data/models/Bank';
import { Branch } from '../../data/models/Branch';
import { Product } from '../../data/models/Product';
import { DeviceForm } from '../../data/models/Device';
import { bankService, branchService, productService, deviceService } from '../../data/service/ApiServiceFactory'; // Correct services

const AddDevice = () => {
  const navigation = useNavigation();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DeviceForm>();

  const selectedBankId = watch('bankId');

  useEffect(() => {
    fetchBanks();
    fetchBranches();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedBankId) {
      const filtered = branches.filter(branch => branch.bankUuid === selectedBankId);
      setFilteredBranches(filtered);
      setValue('branchName', ''); // Clear branch if bank changed
    }
  }, [selectedBankId, branches]);

  const fetchBanks = async () => {
    try {
      const response = await bankService.getAll();
      setBanks(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch banks:', err);
      setBanks([]);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await branchService.getAll();
      setBranches(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      setBranches([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Product fetch failed:', err);
      setProducts([]);
    }
  };

  const onSubmit = async (data: DeviceForm) => {
    setLoading(true);
    try {
      const payload = {
        bankUuid: data.bankId,
        branchUuid: data.branchName,
        productUuid: data.productId,
        name: data.name,
        description: data.description,
        simNumber: data.simNumber,
      };

      await deviceService.create(payload); 
      showAlert('Success', 'Device added successfully');
      navigation.navigate('DeviceList' as never);
    } catch (error: any) {
      console.error('Device create error:', error.response?.data || error.message);
      showAlert('Error', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof DeviceForm,
    placeholder: string,
    required = false,
    multiline = false
  ) => (
    <Controller
      control={control}
      name={name}
      rules={required ? { required: `${placeholder} is required` } : {}}
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
          />
          {errors[name] && (
            <Text style={styles.errorText}>
              {errors[name]?.message as string}
            </Text>
          )}
        </>
      )}
    />
  );

  const renderPicker = (
    name: keyof DeviceForm,
    items: { label: string; value: string }[],
    placeholder: string
  ) => (
    <Controller
      control={control}
      name={name}
      rules={{ required: `Please select ${placeholder.toLowerCase()}` }}
      render={({ field: { onChange, value } }) => (
        <>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(selectedValue) => {
                onChange(selectedValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label={`Select ${placeholder}`} value="" />
              {items.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
          {errors[name] && (
            <Text style={styles.errorText}>
              {errors[name]?.message as string}
            </Text>
          )}
        </>
      )}
    />
  );

  return (
    <SafeAreaView style={headerStyles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CommonHeader title="Add Device" onBackPress={() => navigation.goBack()} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.subHeaderText}>Enter Device Details</Text>

          {renderPicker(
            'bankId',
            banks.map((bank) => ({ label: bank.name, value: bank.uuid })),
            'Bank'
          )}

          {renderPicker(
            'branchName',
            filteredBranches.map((branch) => ({ label: branch.name, value: branch.uuid })),
            'Branch'
          )}

          {renderPicker(
            'productId',
            products.map((p) => ({ label: p.name, value: p.uuid })),
            'Product'
          )}

          {renderInput('name', 'Device Name', true)}
          {renderInput('description', 'Description', false, true)}
          {renderInput('simNumber', 'SIM Number', true)}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Add Device</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddDevice;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
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
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
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


