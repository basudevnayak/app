import React, { ReactNode } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from "react-native";
import CommonHeader from "./CommonHeader";
import { LoginOptionStyle } from "../utils/styles";

interface AuthContainerProps {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
  showRightIcon?: boolean;
  rightIconName?: string;
  onRightPress?: () => void;
  onBackPress?: () => void;
  showLogo?: boolean; // ✅ New prop to control logo visibility
}

const TC_Container = ({
  title,
  children,
  showBackButton = false,
  showRightIcon = false,
  rightIconName = "add-circle-outline",
  onRightPress,
  onBackPress,
  showLogo = true, // ✅ default is true
}: AuthContainerProps) => {
  return (
    <SafeAreaView style={LoginOptionStyle.container}>
      <CommonHeader
        title={title}
        showBackButton={showBackButton}
        showRightIcon={showRightIcon}
        rightIconName={rightIconName}
        onRightPress={onRightPress}
        onBackPress={onBackPress}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={LoginOptionStyle.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerWrapper}>
            {showLogo && (
              <Image
                source={require("../../assets/app_icon.png")}
                style={LoginOptionStyle.logo}
                resizeMode="contain"
              />
            )}
            <View style={styles.childrenContainer}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  innerWrapper: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  childrenContainer: {
    marginTop: 20,
    width: "100%",
    gap: 16,
  },
});

export default TC_Container;
