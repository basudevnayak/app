import { StyleSheet, ViewStyle, TextStyle, Text, ImageStyle, StyleProp, Dimensions } from "react-native";
import { colors, spacing, fontSizes } from "./theme";

const { width } = Dimensions.get("window");

type GlobalStyles = {
  otpInput: TextStyle;
  linkText: TextStyle;
  profileName: TextStyle;
  subTitle: TextStyle;
  footerButtonText: TextStyle;
  footerButton: ViewStyle;
  leaveButton: ViewStyle;
  input: TextStyle;
  container: ViewStyle;
  button: ViewStyle;
  buttonTextPrimary: TextStyle;
  textStyle: TextStyle,
  label: TextStyle,
  contentContainer: ViewStyle,
  title: TextStyle,
  section: TextStyle,
  sectionTitle: TextStyle,
  card: ViewStyle,
  cardTitle: TextStyle,
  cardSubTitle: TextStyle,
  errorText: TextStyle,
  addUserButton: TextStyle,
  sectionBackground: TextStyle,
  tab: TextStyle,
  activeTab: TextStyle,
  tabText: TextStyle,
  activeTabText: TextStyle,
  grid: ViewStyle,
  headerText: TextStyle,
  supportiveText: TextStyle,
  buttonContainer: TextStyle,
  loginButton: TextStyle,
  verifyButtonText: TextStyle,
  resendText: TextStyle,
  otpContainer: ViewStyle,
  middleSection: ViewStyle,
  guestList: ViewStyle,
  textPrimary: TextStyle,
  buttonPrimary: TextStyle,
  forgotPassword: TextStyle,
  profileSection: ViewStyle,
  profileImage: ViewStyle,
  editIcon: TextStyle,
  optionSection: TextStyle,
  optionRow: TextStyle,
  logo: ImageStyle,
  companyName: TextStyle,
  dropdown: TextStyle,
  resendLink: TextStyle,
  description: TextStyle,
  backButton: TextStyle,
  footer: ViewStyle,
  previusButton: ViewStyle,

};

  export const globalStyles = StyleSheet.create<GlobalStyles>({
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  backButton: {
    marginBottom: 20,
    marginTop: 30,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  resendLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  editIcon: {
    fontSize: 18,
    color: '#000',
  },
  optionSection: {
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    padding: 15,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  forgotPassword: {},
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonPrimary: {
    backgroundColor: "#f88d8d",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  textStyle: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  middleSection: {
    flex: 4,
    alignItems: "center",
  },
  guestList: {
    alignItems: "center",
  },
  textPrimary: {
    fontSize: 16,
    color: "#333",
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 10,
  },
  supportiveText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#999",
    marginVertical: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  buttonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 8,
  },

  loginButton: {
    marginTop: 200,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#0000ff",
    borderRadius: 8,
    width: "60%",
  },

  sectionBackground: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FADADD",
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#FBEFEF",
  },
  activeTab: {
    backgroundColor: "#F08080",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333', // Default text color
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    padding: spacing.small,
    borderRadius: 5,
    fontSize: fontSizes.medium,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    borderRadius: 5,
    marginHorizontal: spacing.large,
    marginVertical: spacing.medium,
  },
  buttonTextPrimary: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.medium,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    width: "100%",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 14,
    color: "#666",
  },
  addUserButton: {
    backgroundColor: "#E75480",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    width: "80%",
  },
  addUserButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  leaveButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
    width: "80%",
  },
  leaveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  footerButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },
  footerButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  companyName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  logo: {
    width: 200,
    height: 200,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowText: {
    color: colors.black,
    fontSize: fontSizes.extraLarge,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  previusButton: {
    backgroundColor: colors.lightGray,
    width: 100,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 5,
    alignContent: "center",
  }
});


export const EnterOTPStyle = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  
 
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  normalText: {
    fontSize: 14,
    color: "#000",
  },
  resendText: {
    fontSize: 14,
    color: "#b3302c",
    fontWeight: "bold",
    marginLeft: 5,
  },

 
});


export const EnterOtpSytle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: '#333',
  },
  logo: {
    width: 160,
    height: 80,
    alignSelf: "center",
    marginVertical: 20,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  errorText: {
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 6,
    color: '##b3302c',
  },
  termsText: {
    fontSize: 14,
    color: "#444",
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: "#b3302c",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#b3302c",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    marginTop: 24,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  loginLink: {
    color: "#b3302c",
    fontWeight: "bold",
  },

});

export const PrivacyPolicyStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    padding: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export const TermsAndCondition = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4b2ed2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export const SplashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});

export const ProfileUpdateStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderPic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePicText: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 16,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 15,
    paddingRight: 40, // Added padding on the right to make space for the eye icon
    width: '100%', // Ensure the input takes full width of the container
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Allow absolute positioning of the icon inside the container
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // Ensure the icon is positioned 10px from the right edge
    top: '50%',
    transform: [{ translateY: -12 }], // Center the icon vertically within the container
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#f8b3b3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#8c2f2f',
    fontSize: 18,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    position: 'relative', 
  },
});

export const LoginOptionStyle = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  keyboardAvoidingView: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#999",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxBoxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // align inside the row
    gap: 8,
    paddingHorizontal: 16,
  },
  
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#666",
    fontSize: 14,
  },
  signUpLink: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  linkText: {
    color: "#FF6B6B",
    textDecorationLine: "underline",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },  
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
});


export const LoginStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  rowCenter: {
    alignItems: "center",
  },
  forgot: {
    color: "#2e00d4",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  description: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
      marginTop: 10,
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      gap: 8,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      fontSize: 18,
      textAlign: "center",
      backgroundColor: "#fff",
    },
    resendRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    resendText: {
      fontSize: 14,
      color: "#b3302c",
      fontWeight: "bold",
    },
    timerText: {
      fontSize: 14,
      color: "#999",
    },
    buttonContainer: {
      width: "100%",
      paddingHorizontal: 20,
    },
  });

export const ItemListStyle = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },

});

export const UserDashBoardSytle = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f88",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.25,
    backgroundColor: "#fff",
    zIndex: 2,
    paddingTop: 40,
    elevation: 5,
  },
  drawerHeader: {
    backgroundColor: "#f8b3b3",
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bellIcon: {
    position: "absolute",
    top: 18,
    right: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: "auto",
    padding: 20,
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export const AddBank = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#f88',
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  backButton: {
    marginBottom: 20,
  },
});

export const AddBranchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
  },
});

export const AddDevice = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f8b3b3',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: 'black',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#f88',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export const AddUser = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f8b3b3',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    color: 'black',
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#f88',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
});

export const BankDetails = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#f8b3b3",
    padding: 10,
    borderRadius: 10,
    width: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  headerContainer: {
    backgroundColor: "#f8b3b3",
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f8b3b3",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
    resizeMode: "contain",
  },
  addressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  editText: {
    color: "blue",
    fontWeight: "600",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
  branchBtn: {
    backgroundColor: "#f8b3b3",
    padding: 12,
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 25,
  },
  branchBtnText: {
    fontWeight: "bold",
  },
});

export const BankListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
 
  headerButton: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 8
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    elevation: 4, // for Android shadow
    zIndex: 999
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  bankCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 6
  },
  bankTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6
  },
  bankText: {
    fontSize: 14,
    lineHeight: 20
  },
  searchBar: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  noDataText :{
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const BranchDetails = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#f8b3b3",
    padding: 10,
    borderRadius: 10,
    width: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  headerContainer: {
    backgroundColor: "#f8b3b3",
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f8b3b3",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 15,
  },
  editText: {
    color: "blue",
    fontWeight: "600",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
});

export const BranchList = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  backButton: {
    backgroundColor: "#f8b3b3",
    padding: 10,
    borderRadius: 10,
    width: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  addBranchButton: {
    backgroundColor: "#f8b3b3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
    gap: 8,
  },
  addBranchText: {
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  headerRow: {
    backgroundColor: "#f8b3b3",
    padding: 12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerText: {
    fontWeight: "bold",
  },
  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  branchName: {
    fontWeight: "600",
  },
  footerBar: {
    backgroundColor: "#f8b3b3",
    height: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export const ConfirmPassword = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
});

export const DashboardStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f88",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    zIndex: 2,
    paddingTop: 0,
    elevation: 5,
  },
  drawerHeader: {
    backgroundColor: "#f8b3b3",
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bellIcon: {
    position: "absolute",
    top: 18,
    right: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: "auto",
    padding: 20,
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export const NotificationListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    padding: 5,
  },
  addButton: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
   formContent: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  cancelButton: {
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviceCard: {
    backgroundColor: '#e6e6e6',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'column',
    gap: 4,
  },
  cardText: {
    fontSize: 15,
    color: '#333',
  },
});

export const SignUpStyle = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
 
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  privacyText: {
    color: "#000",
    marginLeft: 5,
  },
  link: {
    color: "#2e00d4",
    textDecorationLine: "underline",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#2e00d4",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: "#2e00d4",
  },
  toggleText: {
    color: "#fff",
  },
  
  dateInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  webDatePicker: {
    marginBottom: 15,
  },
  webDateInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
  },
 
});

export const DeviceDetails = StyleSheet.create({
  editText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export const DeviceInstall = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white", alignItems: "center" },
  backButton: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 5, alignSelf: "flex-start" },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    marginBottom: 10,
  },
  error: { color: "red", fontSize: 12, marginBottom: 5, alignSelf: "flex-start" },
  button: {
    backgroundColor: "#f88",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export const DeviceListStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f8b3b3',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    marginBottom: 6,
    color: '#000',
    fontWeight: '500',
  },
});

export const EditBank = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    marginLeft: 10,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
});


export const EditBranchStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 10 },
  input: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, backgroundColor: '#f9f9f9' },
  dropdown: { marginBottom: 10, borderColor: '#ccc', borderRadius: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  editButton: { backgroundColor: '#E57373', padding: 12, borderRadius: 10 },
  deleteButton: { backgroundColor: '#E57373', padding: 12, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  error: { color: 'red', fontSize: 12 },
});

export const EditDevice = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 },
  editButton: {
    backgroundColor: '#f8b3b3',
    padding: 12,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f8b3b3',
    padding: 12,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export const EditUser = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Matching Edit Product screen
    alignItems: "center",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FF7F60",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF6347", 
    padding: 15,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});



export const ForgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  logo: {
    height: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});


export const UpdateProfile = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  textInput: {
    fontSize: 16,
    padding: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#f8b3b3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#8c2f2f',
    fontSize: 18,
    fontWeight: '600',
  },
});

export const UserList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1,
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    width: 200,
    marginTop: 50,
    marginRight: 16,
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#ffcdd2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryType: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export const BankList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bankItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  bankName: {
    fontWeight: 'bold',
  },
  selectedBankContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  selectedBankName: {
    fontWeight: 'bold',
  },
  selectedBankCode: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});


export const DashboardSystemIntegrator = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f88",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "black",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.25,
    backgroundColor: "#fff",
    zIndex: 2,
    paddingTop: 40,
    elevation: 5,
  },
  drawerHeader: {
    backgroundColor: "#f8b3b3",
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bellIcon: {
    position: "absolute",
    top: 18,
    right: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: "auto",
    padding: 20,
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export const DeviceInstallAccept = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 5, alignSelf: "flex-start" },
  input: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  error: { color: "red", fontSize: 12, marginBottom: 5, alignSelf: "flex-start" },
  button: {
    backgroundColor: "#f88",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export const InstallationStatus = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  button: {
    backgroundColor: "#f88",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  error: { color: "red", marginTop: 10 },
  previousButton: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  previousButtonText: { fontSize: 16, fontWeight: "bold", color: "black" },
});

export const RequestList = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  searchInput: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  requestItem: {
    backgroundColor: 'pink',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});