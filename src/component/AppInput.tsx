// component/AppInput.tsx

import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../utils/theme';

interface AppInputProps extends TextInputProps {
  error?: string;
  isPassword?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({ error, style, isPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor={colors.gray}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.medium,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    fontSize: fontSizes.medium,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSizes.small,
    marginTop: spacing.small,
    marginLeft: spacing.medium,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.medium,
  },
});
