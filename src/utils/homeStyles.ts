import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { spacing, fontSizes } from "./theme";

type HomeStyles = {
  createHomeTitle: TextStyle;
  inputContainer: ViewStyle;
  inputRow: ViewStyle;
  inputIcon: TextStyle;
};

export const homeStyles = StyleSheet.create<HomeStyles>({
  createHomeTitle: {
    fontSize: fontSizes.extraLarge,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: spacing.large,
  },
  inputContainer: {
    paddingHorizontal: spacing.large,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  inputIcon: {
    marginRight: spacing.small,
  },
});
