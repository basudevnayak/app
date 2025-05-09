import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { colors, spacing } from '../utils/theme';

interface AppCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: React.ReactNode;
}

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  value,
  onValueChange,
  label,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
    >
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        tintColors={{ true: colors.primary, false: colors.gray }}
      />
      {label && <View style={styles.labelContainer}>{label}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  labelContainer: {
    marginLeft: spacing.small,
    flex: 1,
  },
}); 