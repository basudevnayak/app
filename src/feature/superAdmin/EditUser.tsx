import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showAlert } from '../../utils/alert/Alert';
import CommonHeader from '../../component/CommonHeader';
import { EditUser } from '../../utils/styles';
import { AppButton } from '../../component/AppButton';
import { headerStyles } from '../../utils/theme';

type FormData = {
  name: string;
  email?: string;
  phone?: string;
  role: string;
  password: string;
  signupType: 'email' | 'phone';
};

const userSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),

  email: Yup.string().when('signupType', {
    is: 'email',
    then: (schema) =>
      schema.email('Invalid email').required('Email is required'),
    otherwise: (schema) => schema.nullable(),
  }),

  phone: Yup.string().when('signupType', {
    is: 'phone',
    then: (schema) =>
      schema
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    otherwise: (schema) => schema.nullable(),
  }),

  role: Yup.string().required('Role selection is required'),
  password: Yup.string().required('Password is required'),
  signupType: Yup.string().oneOf(['email', 'phone']).required(),
});

const EditUserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params as { user: any };

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      phone: '',
      password: '',
      signupType: user?.signupType || 'email',
    },
  } as any); // Explicitly cast to avoid type mismatch

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('phone', user.phone || '');
      setValue('role', user.role || '');
      setValue('password', user.password || '');
      setValue('signupType', user.signupType || 'email');
    }
  }, [user]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch(`http://techlambda.com:7500/users/${user.uuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Update failed');
      }

      showAlert('Success', 'User updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      showAlert('Error', error.message || 'Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={headerStyles.mainContainer}>
      <CommonHeader title="Edit User" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={EditUser.scrollContainer}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={EditUser.input}
                placeholder="Enter Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Text style={EditUser.errorText}>{errors.name.message}</Text>}

          {/* Hidden signupType Controller */}
          <Controller
            control={control}
            name="signupType"
            render={({ field: { value } }) => null}
          />

          {user?.signupType === 'email' && (
            <>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={EditUser.input}
                    placeholder="Email"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && <Text style={EditUser.errorText}>{errors.email.message}</Text>}
            </>
          )}

          {user?.signupType === 'phone' && (
            <>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={EditUser.input}
                    placeholder="Phone"
                    onChangeText={onChange}
                    value={value}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.phone && <Text style={EditUser.errorText}>{errors.phone.message}</Text>}
            </>
          )}

          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <View style={EditUser.inputContainer}>
                <Picker selectedValue={value} onValueChange={onChange} style={EditUser.picker}>
                  <Picker.Item label="Role" value="" />
                  <Picker.Item label="System-Integrator" value="System-Integrator" />
                  <Picker.Item label="Super Admin" value="Super-Admin" />
                  <Picker.Item label="User" value="User" />
                </Picker>
              </View>
            )}
          />
          {errors.role && <Text style={EditUser.errorText}>{errors.role.message}</Text>}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={EditUser.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text style={EditUser.errorText}>{errors.password.message}</Text>}

          <AppButton
            title="Edit User"
            onPress={() => handleSubmit(onSubmit)()}
            loading={loading}
            variant="primary"
          />

          <View style={{ marginBottom: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditUserScreen;
