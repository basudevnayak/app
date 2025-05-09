import React, { useEffect, useState } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/Navigations";
import { KEYS } from "../../utils/constants";
import { ROLE_OPTIONS } from "../../utils/constants"; // 🆕 import
import { showAlert } from "../../utils/alert/Alert";
import CommonHeader from "../../component/CommonHeader";
import { LoginOptionStyle, SignUpStyle as styles } from "../../utils/styles";
import TC_Form, { FormField } from "../../component/TC_Form";
import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { userService } from "../../data/service/ApiServiceFactory";
import { User } from "../../data/models/User";
import { Validators, validateForm, FieldValidationRules, FormFields, FormErrors } from "../../utils/validation/FormValidator";
import { Logger } from "../../utils/logger";
import { validateDOB } from "../../utils/validators"; // 🆕 import the validateDOB function

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SignUp">>();
  const identifier = route.params?.identifier || "";
  const isEmail = identifier.includes("@");

  const [form, setForm] = useState<FormFields>({
    name: "",
    role: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (identifier) {
      setForm((prev) => ({
        ...prev,
        ...(isEmail ? { email: identifier } : { phone: identifier }),
      }));
    }
  }, [identifier]);

  const validationRules: FieldValidationRules = {
    name: Validators.required(),
    role: Validators.required(),
    dob: (value) => validateDOB(value),  // Use the new DOB validation function
    email: (value) => Validators.required()(value) || Validators.email(value),
    phone: (value) => Validators.required()(value) || Validators.phone(value),
    password: (value) => Validators.required()(value) || Validators.strongPassword(value),
    confirmPassword: (value) =>
      Validators.required()(value) || (value !== form.password ? "Passwords do not match" : ""),
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Special handling for DOB to use custom validation
    if (field === 'dob') {
      setErrors((prev) => ({
        ...prev,
        [field]: validateDOB(value) || '',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: validationRules[field]?.(value) || '',
      }));
    }
  };

  const handleSignup = async () => {
    const validationErrors = validateForm(form, validationRules);
    setErrors(validationErrors);
    const hasErrors = Object.values(validationErrors).some((err) => err);

    if (hasErrors) return;

    try {
      setLoading(true);
      const user = await AsyncStorageHelper.getItem<User>(KEYS.USER);
      Logger.log("User", user);

      const updatedUser = {
        name: form.name,
        role: form.role,
        dob: form.dob,
        email: form.email,
        phone: form.phone,
        password: form.password,
        signupType: isEmail ? "email" : "phone",
        deviceToken: "dummyDeviceToken",
        file: null,
      };

      const response = await userService.update(user.uuid, updatedUser);

      if (response.statusCode === 200) {
        showAlert('Success', 'Account created and profile updated!');
        navigation.navigate("LoginOptions");
      } else {
        showAlert('Error', response.message || 'Signup failed.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      showAlert('Error', error?.response?.data?.message || error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const signupFields: FormField[] = [
    { type: 'text', name: 'name', placeholder: 'Enter Name', value: form.name, error: errors.name },
    { type: 'dropdown', name: 'role', placeholder: '', value: form.role, options: [{ label: 'Select Role', value: '' }, ...ROLE_OPTIONS] },
    { type: 'text', name: 'email', placeholder: 'Enter Email', value: form.email, error: errors.email, keyboardType: 'email-address' },
    { type: 'text', name: 'phone', placeholder: 'Enter Phone', value: form.phone, error: errors.phone, keyboardType: 'phone-pad' },
    { type: 'text', name: 'dob', placeholder: 'Enter DOB (DD-MM-YYYY)', value: form.dob, error: errors.dob, keyboardType: 'numeric' },
    { type: 'password', name: 'password', placeholder: 'Enter Password', value: form.password, error: errors.password },
    { type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password', value: form.confirmPassword, error: errors.confirmPassword },
  ];

  return (
    <SafeAreaView style={LoginOptionStyle.container}>
      <KeyboardAvoidingView
        style={LoginOptionStyle.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CommonHeader title="Sign Up" onBackPress={() => navigation.goBack()} />
        <ScrollView
          contentContainerStyle={[LoginOptionStyle.scrollContainer, { paddingHorizontal: 16, paddingBottom: 100 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Image
              source={require("../../../assets/app_icon.png")}
              style={[styles.logo, { width: 100, height: 100 }]}
              resizeMode="contain"
            />
          </View>

          <TC_Form
            fields={signupFields}
            onChange={(name, value) => handleInputChange(name, value)}
            onSubmit={handleSignup}
            loading={loading}
            buttonTitle="Sign Up"
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
