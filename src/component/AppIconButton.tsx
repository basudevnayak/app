import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../utils/theme';

interface AppIconButtonProps {
  icon?: string;
  iconSource?: any;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: any;
  label?: string;
}

export const AppIconButton: React.FC<AppIconButtonProps> = ({
  icon,
  iconSource,
  onPress,
  size = 24,
  color = colors.black,
  style,
  label,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {icon && <Ionicons name={icon as any} size={size} color={color} />}
      {iconSource && <Image source={iconSource} style={styles.iconImage} />}
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    marginTop: spacing.small,
  },
}); 