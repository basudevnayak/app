import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, Animated, NativeSyntheticEvent, TextInputKeyPressEventData, Dimensions, Platform } from "react-native";

interface TC_OTPInputProps {
  value: string[];
  onChange: (index: number, text: string) => void;
  shakeAnimation: Animated.Value;
  error?: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TC_OTPInput: React.FC<TC_OTPInputProps> = ({ value, onChange, shakeAnimation, error }) => {
  const refs = useRef<Array<TextInput | null>>([]);
  const [lastPressedKey, setLastPressedKey] = useState("");

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (lastPressedKey === "Backspace") {
      if (value[index]) {
        // If box has value, clear it
        onChange(index, "");
      } else if (index > 0) {
        // If already empty, move to previous
        refs.current[index - 1]?.focus();
        onChange(index - 1, "");
      }
    } else {
      if (text.length > 1) return; // Only allow 1 character
      onChange(index, text);
      if (text && index < 5) refs.current[index + 1]?.focus();
    }
    setLastPressedKey(""); // Reset after handling
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    setLastPressedKey(e.nativeEvent.key);
  };

  const OTP_BOX_WIDTH = Math.min((SCREEN_WIDTH - 80) / 6, 50);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnimation }] }]}>
      <View style={styles.row}>
        {value.map((digit, i) => (
          <TextInput
            key={i}
            ref={(r) => (refs.current[i] = r)}
            value={digit}
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={handleKeyPress}
            keyboardType={Platform.OS === "web" ? "default" : "numeric"}
            maxLength={1}
            style={[styles.inputBox, { width: OTP_BOX_WIDTH, height: 50 }]}
          />
        ))}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </Animated.View>
  );
};

export default TC_OTPInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  errorText: {
    marginTop: 10,
    fontSize: 12,
    color: "#FF6B6B",
    textAlign: "center",
  },
});
