import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import CommonHeader from '../../component/CommonHeader';
import { showAlert } from '../../utils/alert/Alert';
import { LoginOptionStyle, ProfileUpdateStyle as styles } from '../../utils/styles';
import TC_Form, { FormField } from '../../component/TC_Form';
import AsyncStorageHelper from '../../utils/data/local/AsyncStorageHelper';
import { KEYS } from '../../utils/constants';
import { User } from '../../data/models/User';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Navigations';
import { userService } from '../../data/service/ApiServiceFactory';
import {
  Validators,
  validateForm,
  FieldValidationRules,
  FormFields,
  FormErrors,
} from '../../utils/validation/FormValidator';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type ProfileUpdateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ProfileUpdate: React.FC = () => {
  const navigation = useNavigation<ProfileUpdateScreenNavigationProp>();

  const [form, setForm] = useState<FormFields>({
    name: '',
    role: '',
    dob: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userRole, setUserRole] = useState<string>(''); // To store the logged-in user's role

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const storedUser = await AsyncStorageHelper.getItem<User>(KEYS.USER);
      if (storedUser) {
        setForm({
          name: storedUser.name || '',
          role: storedUser.role || '',
          dob: storedUser.dob || '',
          email: storedUser.email || '',
          phone: storedUser.phone || '',
        });
        setProfilePicture(storedUser.profilePicture || undefined);
        setUserRole(storedUser.role || ''); // Set the logged-in user's role
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsDataLoaded(true);
    }
  };

  const validationRules: FieldValidationRules = {
    name: Validators.required(),
    role: Validators.required(),
    dob: Validators.required(),
    email: (value) => Validators.required()(value) || Validators.email(value),
    phone: (value) => Validators.required()(value) || Validators.phone(value),
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: validationRules[field]?.(value) || '',
    }));
  };

  const handleProfilePicUpdate = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permission', 'Permission to access media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.[0]) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    const validationErrors = validateForm(form, validationRules);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((err) => err);

    if (hasErrors) return;

    try {
      setLoading(true);
      const user = await AsyncStorageHelper.getItem<User>(KEYS.USER);
      const deviceToken = await AsyncStorage.getItem('deviceToken');

      // Prevent changing the role for users who are not Super-Admin or System-Integrator
      if (userRole !== 'Super-Admin' && userRole !== 'System-Integrator') {
        form.role = userRole; // Revert to the current role if the user is not authorized to change it
      }

      const updatedUser = {
        ...form,
        signupType: 'email',
        deviceToken: deviceToken || '',
        file: profilePicture || '',
      };

      const response = await userService.update(user.uuid, updatedUser);

      if (response.statusCode === 200) {
        showAlert('Profile Updated', 'Your profile has been updated successfully.');
        await AsyncStorageHelper.setItem(KEYS.USER, response.data);
        navigation.navigate('Dashboard');
      } else {
        showAlert('Update Failed', response.message || 'Could not update profile.');
      }
    } catch (error) {
      console.error('Update error:', error);
      showAlert('Error', 'Something went wrong while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  const backPressHandler = () => navigation.goBack();

  const navigateToForgotPassword = () => {
    if (!form.email && !form.phone) {
      showAlert('Error', 'No Email or Phone found.');
      return;
    }
    navigation.navigate('ForgotPassword', {
      identifier: form.email || form.phone,
      fromProfileUpdate: true,
    });
  };

  if (!isDataLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  const roleOptions = [
    { label: 'Super-Admin', value: 'Super-Admin' },
    { label: 'System-Integrator', value: 'System-Integrator' },
    { label: 'User', value: 'User' }, // Add any other roles here
    // Add more roles as needed
  ];
  
  const profileFields: FormField[] = [
    { type: 'text', name: 'name', placeholder: 'Enter Name', value: form.name, error: errors.name },
    {
      type: 'dropdown',
      name: 'role',
      placeholder: '',
      value: form.role,
      options: roleOptions, // Populate with all available roles
      editable: userRole === 'Super-Admin' || userRole === 'System-Integrator', // Enable role editing only for Super-Admin and System-Integrator
    },
    { type: 'text', name: 'email', placeholder: 'Enter Email', value: form.email, error: errors.email, keyboardType: 'email-address' },
    { type: 'text', name: 'phone', placeholder: 'Enter Phone', value: form.phone, error: errors.phone, keyboardType: 'phone-pad' },
    { type: 'text', name: 'dob', placeholder: 'Enter DOB (DD-MM-YYYY)', value: form.dob, error: errors.dob, keyboardType: 'numeric' },
  ];
  
  return (
    <SafeAreaView style={LoginOptionStyle.container}>
      <KeyboardAvoidingView
        style={LoginOptionStyle.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CommonHeader title="Update Profile" onBackPress={backPressHandler} />
        <ScrollView
          contentContainerStyle={[LoginOptionStyle.scrollContainer, { paddingHorizontal: 16, paddingBottom: 100 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ gap: 16 }}>
            <TouchableOpacity
              onPress={handleProfilePicUpdate}
              style={[styles.profilePicContainer, { marginTop: 20 }]}
            >
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profilePic} />
              ) : (
                <View style={styles.placeholderPic}>
                  <Ionicons name="person" size={50} color="#aaa" />
                </View>
              )}
              <Text style={styles.changePicText}>Change Profile Picture</Text>
            </TouchableOpacity>

            <TC_Form
              fields={profileFields}
              onChange={(name, value) => handleInputChange(name, value)}
              onSubmit={handleUpdateProfile}
              loading={loading}
              buttonTitle="Update Profile"
            />

            <TouchableOpacity
              onPress={navigateToForgotPassword}
              style={{ marginTop: 10, alignSelf: 'flex-end' }}
            >
              <Text style={{ color: '#FF6B6B', fontSize: 14, fontWeight: 'bold' }}>
                Reset password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
