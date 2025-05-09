import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showAlert } from '../utils/alert/Alert';

const systemIntegratorSchema = Yup.object().shape({
  integratorName: Yup.string().required('Integrator Name is required'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  status: Yup.string().required('Status is required'),
  role: Yup.string().required('Role is required'),
});

const AddSystemIntegratorScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(systemIntegratorSchema),
    defaultValues: {
      integratorName: '',
      mobileNumber: '',
      status: '',
      role: '',
    },
  });

  const onSubmit = (data: any) => {
   showAlert('System Integrator Added Successfully', JSON.stringify(data, null, 2));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Add System Integrator</Text>
      <Text>Enter System Integrator Details</Text>

      {/* INTEGRATOR NAME */}
      <Controller
        control={control}
        name="integratorName"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Integrator Name" style={{ borderBottomWidth: 1 }} onChangeText={onChange} value={value} />
        )}
      />
      {errors.integratorName && <Text style={{ color: 'red' }}>{errors.integratorName.message}</Text>}

      {/* MOBILE NUMBER */}
      <Controller
        control={control}
        name="mobileNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Mobile Number" style={{ borderBottomWidth: 1 }} onChangeText={onChange} value={value} keyboardType="numeric" />
        )}
      />
      {errors.mobileNumber && <Text style={{ color: 'red' }}>{errors.mobileNumber.message}</Text>}

      {/* STATUS */}
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Inactive" value="Inactive" />
          </Picker>
        )}
      />
      {errors.status && <Text style={{ color: 'red' }}>{errors.status.message}</Text>}

      {/* ROLE */}
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Super" value="Super" />
            <Picker.Item label="User" value="User" />
          </Picker>
        )}
      />
      {errors.role && <Text style={{ color: 'red' }}>{errors.role.message}</Text>}

      {/* SAVE BUTTON */}
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: 'pink', padding: 15, marginTop: 20, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Save System Integrator</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSystemIntegratorScreen;

