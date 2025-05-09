import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  Animated,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

import { RootStackParamList } from "../../navigation/Navigations";
import { BASE_URL, KEYS, LOGIN_STRINGS } from "../../utils/constants";
import TC_Input from "../../component/TC_Input";
import { LoginOptionStyle } from "../../utils/styles";
import { login } from "../../data/helper/UserApiHelper";
import { User } from "../../data/models/User";
import TC_Container from "../../component/TC_Container";
import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { showAlert } from "../../utils/alert/Alert";
import { validateEmail, validatePhone, getValidationError } from "../../utils/validation/validator";
import { config, handleGoogleSignInNative, handleGoogleSignInWeb } from "../../utils/auth/GoogleSignInHelper";
import { FadeAnim, ScalAnim } from "../../utils/animation/Shake";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "LoginOptions">;

// Extend User to optionally include Firebase token structure
interface ExtendedUser extends User {
  token?: string;
  stsTokenManager?: {
    accessToken?: string;
  };
}

const LoginOptions = () => {
  const navigation = useNavigation<NavigationProp>();

  const [formState, setFormState] = useState({
    emailOrPhone: "",
    password: "",
    isCheckingAuth: true,
    isLogin: true,
    isTermsChecked: false,
    isDataLoaded: false,
    emailError: "",
    passwordError: "",
    isLoading: false,
  });

  const setField = (key: keyof typeof formState, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const discovery = AuthSession.useAutoDiscovery("https://your-auth-provider.com");
  const [request, response, promptAsync] = AuthSession.useAuthRequest(config, discovery);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await AsyncStorageHelper.getItem<ExtendedUser>(KEYS.USER);
        console.log("🧠 Loaded user from AsyncStorage:", userData);

        const token = userData?.token ?? userData?.stsTokenManager?.accessToken;
        console.log("🔐 Token:", token);

        if (token) {
          const res = await axios.post(`${BASE_URL}/users/verify-token`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const verifiedUser = res.data?.data;
          if (verifiedUser) {
            await AsyncStorageHelper.setItem(KEYS.USER, verifiedUser);
            const role = verifiedUser?.role?.toLowerCase() || "";

            console.log("✅ Role after verification:", role);
            navigation.reset({
              index: 0,
              routes: [{ name: role === "user" ? "UserDashboard" : "Dashboard" }],
            });
            return;
          }
        }
      } catch (err) {
        console.error("Auth Check Error:", err);
      } finally {
        setField("isCheckingAuth", false);
      }
    };

    checkAuthStatus();
    FadeAnim(fadeAnim);
    ScalAnim(scaleAnim);
  }, []);

  useEffect(() => {
    setField("isDataLoaded", true);
  }, []);

  const validateInput = (text: string) => {
    const error = getValidationError(text);
    setField("emailError", error);
  };

  const handleSubmit = async () => {
    setField("emailError", "");
    setField("passwordError", "");

    const trimmed = formState.emailOrPhone.trim();
    const isEmail = validateEmail(trimmed);
    const isPhone = validatePhone(trimmed);

    if (!isEmail && !isPhone) {
      return setField("emailError", getValidationError(trimmed));
    }

    if (formState.isLogin) {
      if (!formState.password.trim()) return setField("passwordError", "Password is required");
      if (formState.password.length < 6) return setField("passwordError", "Minimum 6 characters");
    } else if (!formState.isTermsChecked) {
      return showAlert("Validation", "Please agree to the terms & privacy policy.");
    }

    const payload = {
      email: isEmail ? trimmed : undefined,
      phone: isPhone ? trimmed : undefined,
      password: formState.password,
      signupType: isEmail ? "email" : "phone",
    };

    setField("isLoading", true);

    try {
      if (formState.isLogin) {
        const response = await login(payload);

        if (response.statusCode === 200 && response.data) {
          const userData = response.data;
          await AsyncStorageHelper.setItem<User>(KEYS.USER, userData);
          await AsyncStorage.setItem("lastLoginIdentifier", trimmed);

          const role = userData?.role?.toLowerCase() || "";
          showAlert("Success", "Login successful!");

          navigation.reset({ index: 0, routes: [{ name: role === "user" ? "UserDashboard" : "Dashboard" }] });
        } else {
          showAlert("Login Failed", response.message || "Unable to login");
        }
      } else {
        const signupResponse = await axios.post(`${BASE_URL}/users/signup`, {
          email: isEmail ? trimmed : undefined,
          phone: isPhone ? trimmed : undefined,
          signupType: isEmail ? "email" : "phone",
        });

        const userData = signupResponse.data?.data;
        if (signupResponse.data.statusCode === 200 && (userData?.email || userData?.phone)) {
          const identifier = isEmail ? userData.email : userData.phone;
          await AsyncStorageHelper.setItem<User>(KEYS.USER, userData);
          await AsyncStorage.setItem("lastLoginIdentifier", identifier);
          showAlert("Success", "Signup successful. OTP sent!");
          navigation.navigate("EnterOTP", { emailorphone: identifier });
        } else if (signupResponse.data.message?.toLowerCase().includes("already exists")) {
          showAlert("Account Exists", "This email or phone is already registered. Try logging in.");
        } else {
          showAlert("Signup Failed", signupResponse.data.message || "Unable to sign up.");
        }
      }
    } catch (err: any) {
      showAlert("Error", err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setField("isLoading", false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const result = await handleGoogleSignInNative(promptAsync);
      if (result?.type === "success") {
        const user = await AsyncStorageHelper.getItem<ExtendedUser>(KEYS.USER);
        const role = user?.role?.toLowerCase() || "";
        navigation.navigate(role === "user" ? "UserDashboard" : "Dashboard");
      }
    } else {
      await handleGoogleSignInWeb(navigation);
    }
  };

  const toggleAuthMode = () => {
    setFormState((prev) => ({
      ...prev,
      isLogin: !prev.isLogin,
      emailOrPhone: "",
      password: "",
      isTermsChecked: false,
    }));
  };

  if (formState.isCheckingAuth || !formState.isDataLoaded) {
    return (
      <SafeAreaView style={LoginOptionStyle.container}>
        <Text>{LOGIN_STRINGS.LOADING}</Text>
      </SafeAreaView>
    );
  }

  return (
    <TC_Container title={formState.isLogin ? "Login" : "Sign Up"}>
      <TC_Input
        placeholder={LOGIN_STRINGS.PLACEHOLDER_EMAIL_PHONE}
        value={formState.emailOrPhone}
        onChangeText={(text) => {
          setField("emailOrPhone", text);
          validateInput(text);
        }}
        error={formState.emailError}
      />

      {formState.isLogin && (
        <TC_Input
          placeholder={LOGIN_STRINGS.PLACEHOLDER_PASSWORD}
          value={formState.password}
          onChangeText={(text) => setField("password", text)}
          error={formState.passwordError}
          isPassword={true}
        />
      )}

      <TouchableOpacity
        style={[
          LoginOptionStyle.loginButton,
          !formState.isLogin && !formState.isTermsChecked && { backgroundColor: "#FF6B6B" },
        ]}
        onPress={handleSubmit}
        disabled={!formState.isLogin && !formState.isTermsChecked}
      >
        {formState.isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={LoginOptionStyle.loginButtonText}>
            {formState.isLogin ? LOGIN_STRINGS.LOGIN : LOGIN_STRINGS.SIGN_UP}
          </Text>
        )}
      </TouchableOpacity>
    </TC_Container>
  );
};

export default LoginOptions;
