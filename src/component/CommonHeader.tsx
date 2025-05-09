import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { headerStyles } from "../utils/theme";



interface Props {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIconName?: string;
  onRightPress?: () => void;
  showRightIcon?: boolean; // New prop
}

const CommonHeader: React.FC<Props> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightIconName = "add-circle-outline",
  onRightPress = undefined,
  showRightIcon = false, // Default to false
}) => {
  return (
    <View style={headerStyles.container}>
      {showBackButton && onBackPress ? (
        <TouchableOpacity
          style={headerStyles.backButton}
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      ) : (
        <View style={headerStyles.backButton} />
      )}

      <View style={headerStyles.titleContainer}>
        <Text style={headerStyles.title}>{title}</Text>
      </View>

      {showRightIcon && onRightPress ? (
        <TouchableOpacity
          onPress={onRightPress}
          style={headerStyles.rightSpace}
        >
          <Ionicons name={rightIconName} size={26} color="#007AFF" />
        </TouchableOpacity>
      ) : (
        <View style={headerStyles.rightSpace} />
      )}
    </View>
  );
};

export default CommonHeader;

