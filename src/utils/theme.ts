import {
 
  StyleSheet
 
} from "react-native";
// theme.ts
export const colors = {
  primary: "#F08080",
  secondary: "#FBEFEF",
  background: "#FFFFFF",
  textPrimary: "#333",
  textSecondary: "#666",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#999",
  lightGray: "#ddd",
  buttonText:"red",
  buttonPrimary:"red",
  buttonDanger:"red",
  buttonSecondary:"red",
  cardBackground:"red",
  accent: "#007bff",
  danger: "#FF6B6B",
  warning: "#E75480",
  shadowColor:"red",
  secondaryText:"red",
  headerBackground:"red",
  primaryText:"red"
};

export const CardStyles  = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 14, color: "#555", marginTop: 4 },
  meta: { fontSize: 12, color: "#888", marginTop: 4, fontStyle: "italic" },
  actions: { flexDirection: "row", marginLeft: 12 },
  icon: { marginHorizontal: 6 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noDataText: { fontSize: 16, color: "#777" },
});

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};


export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
};

import { FlexAlignType, ViewStyle } from "react-native";

export const alignment = {
  center: {
    justifyContent: "center" as ViewStyle["justifyContent"],
    alignItems: "center" as FlexAlignType,
  },
  flexStart: {
    justifyContent: "flex-start" as ViewStyle["justifyContent"],
    alignItems: "flex-start" as FlexAlignType,
  },
  flexEnd: {
    justifyContent: "flex-end" as ViewStyle["justifyContent"],
    alignItems: "flex-end" as FlexAlignType,
  },
  spaceBetween: {
    justifyContent: "space-between" as ViewStyle["justifyContent"],
    alignItems: "center" as FlexAlignType,
  },
  row: {
    flexDirection: "row" as ViewStyle["flexDirection"],
    alignItems: "center" as FlexAlignType,
  },
  column: {
    flexDirection: "column" as ViewStyle["flexDirection"],
    alignItems: "center" as FlexAlignType,
  },
};


export const headerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightSpace: {
    width: 40, // Match backButton width to keep title centered
  },
});

