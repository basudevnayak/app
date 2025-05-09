import React, { useState, forwardRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TCInputProps = TextInputProps & {
  label?: string;
  error?: string;
  isPassword?: boolean;
};

const TC_Input = forwardRef<TextInput, TCInputProps>(({ label, error, isPassword, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError]}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={rest.keyboardType || "default"}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

TC_Input.displayName = "TC_Input";

export default TC_Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 13,
  },
});
