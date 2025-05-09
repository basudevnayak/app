import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TC_DropdownProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
  style?: any;
  placeholderTextColor?: string;
  textStyle?: any;
  editable?: boolean; // ✅ New prop to control enabled state
}

export const TC_Dropdown: React.FC<TC_DropdownProps> = ({
  selectedValue,
  onValueChange,
  options,
  style,
  editable = true, // ✅ Default to true
}) => {
  return (
    <View style={[styles.dropdownContainer, style]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="#000"
        enabled={editable} // ✅ Apply editable
      >
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option.label}
            value={option.value}
            enabled={option.disabled !== true}
            color={option.value === '' ? '#888' : '#000'}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    height: 48,
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
    color: '#000',
  },
});

export default TC_Dropdown;