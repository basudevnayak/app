import React, { useRef, useState, useEffect } from "react";
import { Text, TextInput, View, Animated } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigations";
import TC_Container from "../../component/TC_Container";
import { AppButton } from "../../components/common/AppButton";
import { showAlert } from "../../utils/alert/Alert";
import { verifyOTP, resendOTP } from "../../data/helper/EnterOTPApiHelper";
import { Shake } from "../../utils/animation/Shake";
import { LoginStyle } from "../../utils/styles";
import { Logger } from "../../utils/logger";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "EnterOTP">;
  route: RouteProp<RootStackParamList, "EnterOTP">;
};

const EnterOTP: React.FC<Props> = ({ navigation, route }) => {
  const { emailorphone: identifier } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<Array<TextInput | null>>([]);
  const shake = useRef(new Animated.Value(0)).current;
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");

  const onChange = (val: string, idx: number) => {
    if (val.length > 1) return;
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6 || otp.includes("")) {
      setError("Please enter the complete 6-digit OTP.");
      return Shake(shake);
    }

    try {
      const res = await verifyOTP({ identifier, otp: code });
    
      showAlert("Success", res.message);
      res.data?.user
        ? navigation.navigate("Dashboard")
        : navigation.navigate("SignUp", { identifier });
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP.");
      Shake(shake);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      const res = await resendOTP({ identifier });
      showAlert("Info", res.message || "OTP resent successfully.");
      setTimer(30);
      setCanResend(false);
    } catch (err: any) {
      showAlert("Error", err.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!canResend) {
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval!);
            setCanResend(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [canResend]);

  return (
    <TC_Container title="Enter OTP" showBackButton onBackPress={() => navigation.goBack()}>
      <Text style={LoginStyle.description}>
        Please enter the 6-digit OTP sent to your number or email
      </Text>

      <Animated.View style={[LoginStyle.otpContainer, { transform: [{ translateX: shake }] }]}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(r) => (refs.current[i] = r)}
            style={LoginStyle.otpInput}
            value={digit}
            onChangeText={(t) => onChange(t, i)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </Animated.View>

      {error ? <Text style={LoginStyle.errorText}>{error}</Text> : null}

      <View style={LoginStyle.resendRow}>
        {canResend ? (
          <Text style={LoginStyle.resendText} onPress={handleResend}>Resend OTP</Text>
        ) : (
          <Text style={LoginStyle.timerText}>Resend OTP in {timer}s</Text>
        )}
      </View>

      <View style={LoginStyle.buttonContainer}>
        <AppButton title="Verify" onPress={handleVerify} />
      </View>
    </TC_Container>
  );
};

export default EnterOTP;
