import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, fontSizes } from '../utils/theme';

interface ToolbarProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  rightActions?: {
    icon: string;
    onPress: () => void;
  }[];
  backgroundColor?: string;
  textColor?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
  rightActions = [],
  backgroundColor = colors.white,
  textColor = colors.black,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.toolbar, { backgroundColor }]}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
        )}
        {showMenuButton && (
          <TouchableOpacity
            onPress={() => {
              // Handle menu press
            }}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="menu" size={24} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            style={[styles.iconButton, index > 0 && styles.rightIconMargin]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={action.icon as any} size={24} color={textColor} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    elevation: 4,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: fontSizes.large,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: spacing.medium,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconMargin: {
    marginLeft: spacing.medium,
  },
});

export default Toolbar; 