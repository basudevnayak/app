import React from "react";
import { View, TextInput, KeyboardTypeOptions } from "react-native";
import { TC_TextInputWTextProps } from "./props";
import { globalStyles } from "../utils/style";
import { TC_Text } from "./TC_Text";

// Define the component as a functional component with explicit typing
const TC_InputWText: React.FC<TC_TextInputWTextProps> = ({
  label,
  input,
  value,
  setValue,
  keyboardTypeOptions = "default", // ✅ Added Default Value
}) => {
  return (
    <View>
      <TC_Text {...label} />
      <TextInput
        style={globalStyles.input}
        value={value}
        onChangeText={setValue}
        placeholder={input.label}
        keyboardType={keyboardTypeOptions} // ✅ Keyboard Type Added
      />
    </View>
  );
};

export { TC_InputWText };
