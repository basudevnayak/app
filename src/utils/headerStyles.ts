// import { StyleSheet, ViewStyle, TextStyle } from "react-native";
// import { colors, spacing, fontSizes } from "./theme";

// type HeaderStyles = {
//   header: ViewStyle;
//   backButton: ViewStyle;
//   headerText: TextStyle;
//   profileIcon: ViewStyle;
// };

// export const headerStyles = StyleSheet.create<HeaderStyles>({
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: spacing.medium,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.textSecondary,
//   },
//   backButton: {
//     padding: spacing.small,
//   },
//   headerText: {
//     fontSize: fontSizes.large,
//     fontWeight: "bold",
//   },
//   profileIcon: {
//     // Profile icon specific styling
//   },
// });

/* import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import { colors, spacing, fontSizes } from "./theme";

type HeaderStyles = {
    header:ViewStyle,
     text:TextStyle;
    headerIcons: ViewStyle;
    iconMargin: ViewStyle;
    backButton: ViewStyle;
    profileIcon: ViewStyle;
};

export const headerStyles = StyleSheet.create<HeaderStyles>({
   
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: "100%",
  },
 
  text: {
    fontSize: fontSizes.medium,
    fontWeight: "semibold",
    color: colors.black,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMargin: {
    marginLeft: spacing.large,
  },
  backButton: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  profileIcon: {
    flexDirection: "row",
    alignItems: 'flex-end',
  },
}); */



import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors, spacing, fontSizes } from "./theme";

type HeaderStyles = {
  header: ViewStyle;
  text: TextStyle;
  headerIcons: ViewStyle;
  iconMargin: ViewStyle;
  backButton: ViewStyle;
  profileIcon: ViewStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalItem: ViewStyle;
  modalText: TextStyle;
  modalClose: TextStyle;
};

export const headerStyles = StyleSheet.create<HeaderStyles>({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: "100%",
  },

  text: {
    fontSize: fontSizes.medium,
    fontWeight: "600",
    color: colors.black,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconMargin: {
    marginLeft: spacing.large,
  },

  backButton: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },

  profileIcon: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: colors.white,
    width: "80%",
    padding: spacing.large,
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    marginBottom: spacing.medium,
    color: colors.black,
  },

  modalItem: {
    paddingVertical: spacing.medium,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  modalText: {
    fontSize: fontSizes.medium,
    color: colors.black,
  },

  modalClose: {
    marginTop: spacing.medium,
    fontSize: fontSizes.medium,
    color: colors.primary,
    fontWeight: "600",
  },
});

