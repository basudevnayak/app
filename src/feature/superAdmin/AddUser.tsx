// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
// import CommonHeader from '../../component/CommonHeader';
// import { headerStyles } from '../../utils/theme';
// import { showAlert } from '../../utils/alert/Alert';
// import { Logger } from '../../utils/logger';
// import { signUp } from '../../data/helper/UserApiHelper';

// const userSchema = Yup.object().shape({
//   name: Yup.string().required('Username is required'),
//   email: Yup.string().email('Invalid email'),
//   phone: Yup.string().when('signupType', {
//     is: 'phone',
//     then: (schema) =>
//       schema
//         .required('Phone number is required')
//         .matches(/^[1-9][0-9]{9}$/, 'Phone number must be a valid 10-digit number'),
//     otherwise: (schema) => schema.notRequired(),
//   }),  
//   role: Yup.string().required('Role selection is required'),
//   password: Yup.string().required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
//   signupType: Yup.string().required('Signup Type selection is required'),
// }).test('emailOrPhone', 'Either Email or Phone Number is required', function (value) {
//   return !!(value.email || value.phone);
// });

// const AddUser = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(userSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       phone: '',
//       role: '',
//       password: '',
//       confirmPassword: '',
//       signupType: '',
//     },
//   });

//   const formatPhoneNumber = (input: string): string => {
//     return input.replace(/\D/g, '').slice(-10);
//   };
//   const onSubmit = async (data: any) => {
//     try {
//       setLoading(true);
  
//       const payload = {
//         ...data,
//         deviceToken: 'dummyDeviceToken',
//       };
      
//       if (payload.signupType === 'email') {
//         delete payload.phone;
//       } else if (payload.signupType === 'phone') {
//         payload.phone = formatPhoneNumber(payload.phone);
//         delete payload.email;
//       }      
//       Logger.log('Submitting user:', payload);
  
//       await signUp('/users/signup', payload);
  
//       showAlert('Success', 'User added successfully');
//       navigation.goBack();
//     } catch (error: any) {
//       Logger.error('Error creating user:', error);
  
//       const errorMessage =
//         error?.response?.data?.message ||
//         error?.message ||
//         'Failed to add user. Please try again.';
  
//       showAlert('Error', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <View style={headerStyles.mainContainer}>
//       <CommonHeader
//         title="Add User"
//         onBackPress={() => navigation.goBack()}
//       />

//       <View style={styles.container}>
//         <Text style={styles.subHeaderText}>Enter User Details</Text>

//         {/* NAME */}
//         <Controller
//           control={control}
//           name="name"
//           render={({ field: { onChange, value } }) => (
//             <TextInput style={styles.input} placeholder="Name" onChangeText={onChange} value={value} />
//           )}
//         />
//         {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

//         {/* EMAIL */}
//         <Controller
//           control={control}
//           name="email"
//           render={({ field: { onChange, value } }) => (
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               onChangeText={onChange}
//               value={value}
//               keyboardType="email-address"
//             />
//           )}
//         />
//         {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//         {/* PHONE */}
//         <Controller
//           control={control}
//           name="phone"
//           render={({ field: { onChange, value } }) => (
//             <TextInput
//               style={styles.input}
//               placeholder="Phone Number"
//               keyboardType="phone-pad"
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

//         {/* ROLE */}
//         <Controller
//           control={control}
//           name="role"
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputContainer}>
//               <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
//                 <Picker.Item label="Select Role" value="" />
//                 <Picker.Item label="System Integrator" value="System-Integrator" />
//                 <Picker.Item label="User" value="User" />
//                 <Picker.Item label="Super-Admin" value="Super-Admin" />
//               </Picker>
//             </View>
//           )}
//         />
//         {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}

//         {/* SIGNUP TYPE */}
//         <Controller
//           control={control}
//           name="signupType"
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputContainer}>
//               <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
//                 <Picker.Item label="Select Signup Type" value="" />
//                 <Picker.Item label="Email" value="email" />
//                 <Picker.Item label="Phone" value="phone" />
//               </Picker>
//             </View>
//           )}
//         />
//         {errors.signupType && <Text style={styles.errorText}>{errors.signupType.message}</Text>}

//         {/* PASSWORD */}
//         <Controller
//           control={control}
//           name="password"
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWithIcon}>
//               <TextInput
//                 style={styles.inputField}
//                 placeholder="Password"
//                 secureTextEntry={!showPassword}
//                 onChangeText={onChange}
//                 value={value}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#999" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//         {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

//         {/* CONFIRM PASSWORD */}
//         <Controller
//           control={control}
//           name="confirmPassword"
//           render={({ field: { onChange, value } }) => (
//             <View style={styles.inputWithIcon}>
//               <TextInput
//                 style={styles.inputField}
//                 placeholder="Confirm Password"
//                 secureTextEntry={!showConfirmPassword}
//                 onChangeText={onChange}
//                 value={value}
//               />
//               <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#999" />
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//         {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

//         {/* SAVE BUTTON */}
//         <TouchableOpacity
//           onPress={handleSubmit(onSubmit)}
//           style={[styles.saveButton, loading && styles.saveButtonDisabled]}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save User</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   subHeaderText: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 8,
//   },
//   inputField: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 2,
//   },
//   inputContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   saveButton: {
//     backgroundColor: '#FF6B6B',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   saveButtonDisabled: {
//     opacity: 0.6,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
// export default AddUser;



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import CommonHeader from '../../component/CommonHeader';
import { headerStyles } from '../../utils/theme';
import { showAlert } from '../../utils/alert/Alert';
import { Logger } from '../../utils/logger';
import { SignUpApiHelper } from '../../data/helper/SignUpApiHelper';

const userSchema = Yup.object().shape({
  name: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email'),
  phone: Yup.string().when('signupType', {
    is: 'phone',
    then: (schema) =>
      schema
        .required('Phone number is required')
        .matches(/^[1-9][0-9]{9}$/, 'Phone number must be a valid 10-digit number'),
    otherwise: (schema) => schema.notRequired(),
  }),
  role: Yup.string().required('Role selection is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  signupType: Yup.string().required('Signup Type selection is required'),
}).test('emailOrPhone', 'Either Email or Phone Number is required', function (value) {
  return !!(value.email || value.phone);
});

const AddUser = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: '',
      signupType: '',
    },
  });

  const formatPhoneNumber = (input: string): string => {
    return input.replace(/\D/g, '').slice(-10);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
  
      // Remove confirmPassword before sending
      const { confirmPassword, ...payload } = data;
  
      payload.deviceToken = 'dummyDeviceToken';
  
      if (payload.signupType === 'email') {
        delete payload.phone;
      } else if (payload.signupType === 'phone') {
        payload.phone = formatPhoneNumber(payload.phone);
        delete payload.email;
      }
  
      Logger.log('Submitting user:', payload);
  
      // ✅ Updated API call
      const response = await SignUpApiHelper.signup(payload);
  
      Logger.log('Signup Success Response:', response);
  
      showAlert('Success', 'User added successfully');
      navigation.goBack();
    } catch (error: any) {
      Logger.error('Error creating user:', error);
  
      const errorMessage =
        error?.message || 'Failed to add user. Please try again.';
  
      showAlert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={headerStyles.mainContainer}>
      <CommonHeader
        title="Add User"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Text style={styles.subHeaderText}>Enter User Details</Text>

        {/* NAME */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Name" onChangeText={onChange} value={value} />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        {/* EMAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        {/* PHONE */}
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

        {/* ROLE */}
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                <Picker.Item label="Select Role" value="" />
                <Picker.Item label="System Integrator" value="System-Integrator" />
                <Picker.Item label="User" value="User" />
                <Picker.Item label="Super-Admin" value="Super-Admin" />
              </Picker>
            </View>
          )}
        />
        {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}

        {/* SIGNUP TYPE */}
        <Controller
          control={control}
          name="signupType"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
                <Picker.Item label="Select Signup Type" value="" />
                <Picker.Item label="Email" value="email" />
                <Picker.Item label="Phone" value="phone" />
              </Picker>
            </View>
          )}
        />
        {errors.signupType && <Text style={styles.errorText}>{errors.signupType.message}</Text>}

        {/* PASSWORD */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* CONFIRM PASSWORD */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.inputField}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                onChangeText={onChange}
                value={value}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        {/* SAVE BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save User</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
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

export default AddUser;

