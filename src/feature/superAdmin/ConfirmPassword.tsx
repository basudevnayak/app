import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigations";
import { TC_BackButton } from "../../component/TC_BackButton";
import { validatePassword } from "../../utils/validators";
import { AppButton } from "../../components/common/AppButton";
import { Shake } from "../../utils/animation/Shake";
import { showAlert } from "../../utils/alert/Alert";
import { ConfirmPassword as ConfirmPasswordStyles } from "../../utils/styles";

type ConfirmPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ConfirmPassword"
>;
type ConfirmPasswordScreenRouteProp = RouteProp<RootStackParamList, "ConfirmPassword">;

const ConfirmPassword: React.FC = () => {
  const navigation = useNavigation<ConfirmPasswordScreenNavigationProp>();
  const route = useRoute<ConfirmPasswordScreenRouteProp>();
  const { emailOrPhone } = route.params;

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const shakeAnim = useRef(new Animated.Value(0)).current;

 
  const handleConfirm = () => {
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters.");
      Shake(shakeAnim);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      Shake(shakeAnim);
      return;
    }
    setError("");
   showAlert("Success", "Password has been updated successfully.");
    // Navigate to the login screen after successful password update
    navigation.navigate("Login");
  };

  return (
    <View style={ConfirmPasswordStyles.container}>
      <TC_BackButton />
      <Text style={ConfirmPasswordStyles.title}>Confirm Password</Text>
      <Image
        source={require("../../../assets/app_icon.png")}
        style={ConfirmPasswordStyles.logo}
        resizeMode="contain"
      />
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <TextInput
          style={ConfirmPasswordStyles.input}
          placeholder="Enter Your Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={ConfirmPasswordStyles.input}
          placeholder="Confirm Your Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </Animated.View>

      {error ? <Text style={ConfirmPasswordStyles.errorText}>{error}</Text> : null}
      <AppButton title="Submit" onPress={handleConfirm} />
    </View>
  );
};


export default ConfirmPassword;
