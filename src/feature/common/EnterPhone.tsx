import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigations";

import { TC_InputWText } from "../../component/TC_TextInputWText";
import { TC_Text } from "../../component/TC_Text";
import { globalStyles } from "../../utils/style";
import { HINTS } from "../../utils/constants";
import { sendPhoneNumber } from "../../data/helper/EnterPhoneApiHelper";
import { showAlert } from "../../utils/alert/Alert";
import { EnterOtpSytle } from "../../utils/styles";

type EnterPhoneScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EnterPhone = () => {
  const navigation = useNavigation<EnterPhoneScreenNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formatPhoneNumber = (input: string): string => {
    let formatted = input.trim();
    if (!formatted.startsWith("+91")) {
      formatted = "+91" + formatted.replace(/^\+91/, "");
    }
    return formatted;
  };

  const isValidPhoneNumber = (number: string): boolean => {
    return /^\+91\d{10}$/.test(number);
  };

  const validate = (): boolean => {
    const formatted = formatPhoneNumber(phoneNumber);
    if (!formatted) {
      setError("Phone number is required.");
      return false;
    }
    if (!isValidPhoneNumber(formatted)) {
      setError("Enter a valid 10-digit phone number.");
      return false;
    }
    if (!agree) {
      setError("You must agree to the Terms and Conditions.");
      return false;
    }
    setError("");
    return true;
  };

  const handleGetOtp = async () => {
    if (!validate()) return;
    setLoading(true);
    const formattedPhone = formatPhoneNumber(phoneNumber);
    try {
      const result = await sendPhoneNumber(formattedPhone);
      if (result && result.success) {
       showAlert("Success", "OTP sent successfully");
        navigation.navigate("EnterOTP", { emailorphone: formattedPhone });
      } else {
       showAlert("Error", result?.message || "Failed to send OTP. Please try again.");
      }
    } catch (error: any) {
      console.error("Send OTP Error:", error);
     showAlert("Error", error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={EnterOtpSytle.container}
    >
      <ScrollView 
        contentContainerStyle={EnterOtpSytle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.column}>
          {/* Title */}
          <TC_Text style={EnterOtpSytle.titleText} label="Verify your phone number" />

          {/* Logo */}
          <Image
            source={require("../../../assets/app_icon.png")}
            style={EnterOtpSytle.logo}
            resizeMode="contain"
          />

          {/* Phone Input */}
          <TC_InputWText
            keyboardTypeOptions="phone-pad"
            label={{ label: HINTS.ENTER_PHONE, style: globalStyles.inputLabel }}
            input={{ 
              label: HINTS.EYOUR_PHONE, 
              style: globalStyles.inputText
            }}
            value={phoneNumber}
            setValue={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
            maxLength={10}
          />

          {/* Error */}
          {error && <Text style={EnterOtpSytle.errorText}>{error}</Text>}

          {/* Description */}
          <Text style={EnterOtpSytle.subText}>
            A one-time password (OTP) will be sent to your phone number
          </Text>

          {/* Terms & Conditions */}
          <TouchableOpacity 
            onPress={() => setAgree((prev) => !prev)} 
            style={EnterOtpSytle.checkboxContainer}
            activeOpacity={0.7}
          >
            <Text style={EnterOtpSytle.checkbox}>{agree ? "☑" : "☐"}</Text>
            <Text style={EnterOtpSytle.termsText}>
              I agree to the{" "}
              <Text style={EnterOtpSytle.linkText} onPress={() => navigation.navigate("TermsAndConditions")}>
                Terms and Conditions
              </Text>{" "}
              and{" "}
              <Text style={EnterOtpSytle.linkText} onPress={() => navigation.navigate("PrivacyPolicy")}>
                Privacy Policy
              </Text>.
            </Text>
          </TouchableOpacity>

          {/* Get OTP Button */}
          <TouchableOpacity
            onPress={handleGetOtp}
            disabled={!agree || loading}
            style={[
              EnterOtpSytle.button,
              (!agree || loading) && EnterOtpSytle.buttonDisabled,
            ]}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={EnterOtpSytle.buttonText}>Get OTP</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <Text style={EnterOtpSytle.footerText}>
            Already have an account?{" "}
            <Text
              style={EnterOtpSytle.loginLink}
              onPress={() => navigation.navigate("LoginOptions")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default EnterPhone;
