import React, { useState, useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../../navigation/Navigations";
import TC_Container from "../../component/TC_Container";
import TC_Input from "../../component/TC_Input";
import { AppButton } from "../../components/common/AppButton";
import { validateEmail, validatePhone, validatePassword } from "../../utils/validators";
import { Shake } from "../../utils/animation/Shake";
import { forgetPasswordApiHelper } from "../../data/helper/ForgetPasswordApiHelper";
import { showAlert } from "../../utils/alert/Alert";
import { isStrongPassword } from "../../utils/validation/Password";
import { LoginOptionStyle } from "../../utils/styles";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ForgotPassword">>();
  const route = useRoute<RouteProp<RootStackParamList, "ForgotPassword">>();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const [form, setForm] = useState({ identifier: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ identifier: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { identifier: routeIdentifier, fromProfileUpdate } = route.params || {};
      setIsResetPassword(!!fromProfileUpdate);
      if (routeIdentifier) {
        setForm((prev) => ({ ...prev, identifier: routeIdentifier }));
      } else {
        try {
          const savedIdentifier = await AsyncStorage.getItem("/users/reset-password/identifier");
          if (savedIdentifier) {
            setForm((prev) => ({ ...prev, identifier: savedIdentifier }));
          }
        } catch (err) {
          console.error("Error reading identifier from storage:", err);
        }
      }
      setIsDataLoaded(true);
    };
    init();
  }, [route.params]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSendCode = async () => {
    setErrors({ identifier: "", newPassword: "", confirmPassword: "" });
    const { identifier, newPassword, confirmPassword } = form;

    if (!identifier.trim()) {
      setErrors((prev) => ({ ...prev, identifier: "Please enter your email or phone number" }));
      Shake(shakeAnim);
      return;
    }

    const isEmail = identifier.includes("@");
    const idValidation = isEmail ? validateEmail(identifier) : validatePhone(identifier);
    if (idValidation) {
      setErrors((prev) => ({ ...prev, identifier: idValidation }));
      Shake(shakeAnim);
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation || !isStrongPassword(newPassword)) {
      setErrors((prev) => ({ ...prev, newPassword: passwordValidation || "Password is not strong enough." }));
      Shake(shakeAnim);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      Shake(shakeAnim);
      return;
    }

    setLoading(true);
    try {
      const response = await forgetPasswordApiHelper({ identifier, password: newPassword });
      if (response.statusCode==200) {
        showAlert("Success", response.message || "Password updated successfully")
          navigation.reset({ index: 0, routes: [{ name: "LoginOptions" }] });
        
      } else {
        showAlert("Error", response.message || "Something went wrong.");
      }
    } catch (err: any) {
      showAlert("Error", err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isDataLoaded) return null;

  return (
    <TC_Container
      title={isResetPassword ? "Reset Password" : "Forgot Password"}
      showBackButton
      onBackPress={() => navigation.goBack()}
    >
      <Animated.View style={[LoginOptionStyle.content, { transform: [{ translateX: shakeAnim }] }]}> 
        {!isResetPassword && (
          <TC_Input
            placeholder="Enter your Phone No./Email"
            value={form.identifier}
            onChangeText={(text) => handleChange("identifier", text)}
            autoCapitalize="none"
            error={errors.identifier}
          />
        )}

        <TC_Input
          placeholder="New Password"
          value={form.newPassword}
          onChangeText={(text) => handleChange("newPassword", text)}
          isPassword
          error={errors.newPassword}
        />

        <TC_Input
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          isPassword
          error={errors.confirmPassword}
        />

        <View style={{ width: "100%" }}>
          <AppButton title="Send Password" loading={loading} onPress={handleSendCode} />
        </View>
      </Animated.View>
    </TC_Container>
  );
};

export default ForgotPassword;
