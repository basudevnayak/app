import { StyleSheet, ViewStyle, TextStyle, Text, ImageStyle, StyleProp } from "react-native";
import { colors, spacing, fontSizes } from "./theme";
import { IconProps } from "react-native-vector-icons/Icon";

type GlobalStyles = {
    column: ViewStyle;
    h1Text: TextStyle;
    backIcon: ViewStyle;
    inputLabel: TextStyle;
    inputText: TextStyle;
    errorText: TextStyle;
    normalText: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    largeHeight: ViewStyle;
    row: ViewStyle;
    rowCenter: ViewStyle;
    rowEnd: ViewStyle;
    rowStart: ViewStyle;
    smallHeight: ViewStyle;
    verySmallHeight: ViewStyle;
    mediumHeight: ViewStyle;
    image: ImageStyle;
    otpContainer: ViewStyle;
    otpInput: TextStyle;
    icon: ImageStyle;
    chooseBox: ViewStyle;
    card: ViewStyle;
    labelIcon: ImageStyle;
    boxRectangle: ViewStyle;
    dropdownInput: ViewStyle;
    blueText: TextStyle;
    inputField: TextStyle;
    inputIcon: ViewStyle;
    input: TextStyle;
    shortButton:ViewStyle;
}

export const globalStyles = StyleSheet.create<GlobalStyles>({
    column: {
        flex: 1,
        flexDirection: "column",
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        height: 65
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16
    },
    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    h1Text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backIcon: {
        marginBottom: 20,
        marginTop: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    inputText: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.textSecondary,
        padding: spacing.small,
        borderRadius: 5,
        fontSize: fontSizes.medium,
        color: colors.textPrimary,
    },
    inputField: {
        height: 55,
        borderColor: colors.textSecondary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: colors.textPrimary,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 12,
    },
    normalText: {
        fontSize: 16,
        color: colors.textPrimary,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    shortButton: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 40,
        width: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        fontSize: fontSizes.medium,
        fontWeight: "semibold",
    },
    largeHeight: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    mediumHeight: {
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    smallHeight: {
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    verySmallHeight: {
        height: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 230,
        height: 110,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#000",
        textAlign: "center",
        fontSize: 18,
        borderRadius: 8,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    chooseBox: {
        height: 65,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    card: {
        backgroundColor: "#F8F9FA",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 8,
    },
    labelIcon: {
        marginRight: 10,
    },
    boxRectangle: {
        width: 200,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdownInput: {
        borderWidth: 1,
        borderColor: colors.textSecondary,
        borderRadius: 5,
        backgroundColor: colors.white,
        height: 50,
        overflow: "hidden",
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginBottom: 10,
    },
    blueText: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.textSecondary,
        padding: spacing.small,
        borderRadius: 5,
        fontSize: fontSizes.medium,
        color: colors.textPrimary,
    }
});