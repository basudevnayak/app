
const HINTS={
    E_APPLIANCE_NAME : "Enter Appliance Name",
    APPLICANCE_NAME  : "Appliance Name:",
    APPLIANCETYPE    : "Appliance Type:",
    EAPPLIANCETYPE   : "Enter Appliance Type",
    APPLIANCEBRAND   : "Appliance Brand:",
    EAPPLIANCEBRAND  : "Enter Appliance Brand:",
    ADD_APPLIANCE    : "Add Appliance" ,
    NAVIGATE_TO_ENTER: "Go To Enter Phone",
    EYOUR_EMAIL_ID : "Enter your email ID",
    EYOURPASSWORD : "Enter your password",
    EMAIL:"Email",
    PASSWORD:"Password",
    FIRST_NAME:"First Name:",
    EFIRST_NAME:"Enter First Name",
    LAST_NAME:"Last Name",
    ELAST_NAME:"Enter Last Name", 
    DOB:"Date of Birth:",
    EDOB:"Enter Date of Birth",
    ADD_GUEST : "Add Guest",
    EGUEST_NAME : "Enter Guest Name",
    ADD_HOME : "Add Home",
    EHOME_ADDRESS: "Enter Home Address",
    AROOM_SCREEN: "Add Room Screen",
    FORGOT_PASSWORD: "Forgot Password",
    GUEST_ROOM: "Guest Room",
    ENTER_PASSWORD: "Enter Password",
    ENTER_OTP: "Enter OTP",
    NUMBER_PAD: "Number Pad",
    ENTER_PHONE: "Enter Phone",
    EYOUR_PHONE: "Enter Your Phone",
    GET_OTP: "Get OTP",
    LOGIN_PAGE: "Login Page",
    ENTER_USERNAME: "Enter Username",
    ROOM_NAME: "Room Name",
    START_TIME: 'Start Time',
    END_TIME: 'End Time',
    ENTER_EMAIL: "Enter Email",
    ENTER_OTP_TITLE: "Enter OTP",
    ENTER_OTP_DESCRIPTION: "Please enter the OTP sent to your number",
    OTP_NOT_RECEIVED: "Didn't receive the OTP?",
    RESEND: "Resend",
    VERIFY_BUTTON: "Verify",
    OTP_VERIFIED_SUCCESS: "OTP verified successfully.",
    OTP_VERIFICATION_FAILED: "Failed to verify OTP. Please try again.",
    RESEND_OTP_SUCCESS: "OTP resent successfully.",
    RESEND_OTP_FAILED: "Failed to resend OTP. Please try again.",
    DEBUG_LOG_LABEL: "OTP: ",

    


}

// src/utils/constants/RoleConstants.ts

export const ROLE_OPTIONS = [
  { label: 'Super Admin', value: 'Super-Admin' },
  { label: 'System Integrator', value: 'System-Integrator' },
  { label: 'User', value: 'User' },
];


export const KEYS = {
  USER : "USER",
  SELECTED_BANK : "SELECTED_BANK",
  SELECTED_PRODUCT : "SELECTED_PRODUCT"
}


const ERROR ={
   FIX_ERROR: 'Please fix the errors before proceeding.',
   VALID_ERROR: 'Validation Error',
   GENERAL_ERROR: 'Error',
   SUCCESS: 'Success',
   LOGIN_SUCCESS: 'Login Successful',
   WELCOME_ERROR: 'Welcome',
   INVALID_INPUT: "Invalid Input",
   FILL_OUT_ALL_FIELDS: "Please fill out all fields.",
   SUBMITTED: 'Submitted',
   SENSOR_ERROR: 'Please select a sensor before proceeding',
   GUEST_ERROR: ' Guest name cannot be empty.',
   PREMISE_ERROR: 'Validation Error, Please enter a valid premise name.',
   HOME_ERROR: 'Validation Error, Please enter a valid home address.',
   EVENT_ERROR: 'Error, Please select an event before submitting',
   PHONE_NUMBER_ERROR: 'Validation Error", "Phone number is required.',
   VALIDATION_P_NUMBER: 'Validation Error, Enter a valid 10-digit phone number.',
   PASSWORD_ERROR: 'Validation Error, Password is required.',
   PASSWORD_LENGTH: 'Validation Error", "Password must be at least 6 characters.',
   OTP_ERROR: 'Error, Please enter the complete OTP.',
   FIELDS_ERROR: 'Error, Both fields are required',
   NUMBER_ERROR: 'Error, Enter a valid number (10-15 digits)',
   NUMBER_NOT_MATCH: 'Error, Numbers do not match',
   NUMBER_CONFIRMED_SUCCESS: 'Success, Number confirmed successfully!',
   RESEND_OTP: 'Resend OTP", "OTP has been resent.',
   VALIDATION_ERROR: "Enter a valid 10-digit phone number.",
   LOGIN_SUCCESSFUL_ERROR:"Login successful!",
   ENTER_THE_OTP_ERROR:"Please enter the complete OTP.",
   ENTERED_OTP_ERROR:"Success, Entered OTP: ",
   NAME_VALIDATION_ERROR: "First name must be 'pankaj' and last name must be 'kumar'.",
   INCOMPLETE_INFORMATION_ERROR: "Incomplete Information,Please fill out all fields",
   GUEST_NAME_ERROR: "Guest name cannot be empty.",
   GUEST_ADDED_SUCCESS_ERROR: "Guest added successfully!",
   PREMISE_NAME_ERROR: "Please enter a valid premise name.",
   HOME_ADDRESS_ERROR: "Please enter a valid home address.",
   EMAIL_PHONE_ERROR: 'Please enter an email or phone number.',
   VERIFICATION_SUCCESS_ERROR: 'Success, Verification code sent successfully.',
   SIM_NUMBER_ERROR: 'Enter a valid SIM number (10-15 digits)',
   IP_ADD_ERROR:'Enter a valid IP address',
   DETAILS_SUBMITTED_ERROR:'Details submitted successfully!',
   SUCCESSFULLY_ERROR :' added successfully!',
   PROCEEDING_ERROR: ' Please select a sensor before proceeding',
   ACKNOWLEDGEMENT_SUCCESS: 'Acknowledgement added successfully!',
   SETTINGS_UPDATE_SUCCESS: "Settings updated successfully",
   SETTINGS_UPDATE_FAILED: "Failed to update settings",

};
export const BASE_URL= 'http://techlambda.com:7500'; 



export const TOKEN =
  "your_secure_token_here"; 
  export const LOGIN_STRINGS = {
    WELCOME: "Welcome Back 👋",
    LOGIN_TO_CONTINUE: "Login to continue",
    PLACEHOLDER_EMAIL_PHONE: "Enter email or phone number",
    PLACEHOLDER_PASSWORD: "Enter password",
    LOGIN: "Login",
    FORGOT_PASSWORD: "Forgot password?",
    OR: "or",
    GOOGLE_LOGIN: "Continue with Google",
    TERMS_AGREEMENT: "By continuing, you agree to our ",
    TERMS: "Terms and Conditions",
    PRIVACY: "Privacy Policy",
    NO_ACCOUNT: "Don’t have an account?",
    SIGN_UP: " Sign up",
    LOADING: "Loading...",
    VALIDATION_ERROR: "Please enter both email/phone and password",
    LOGIN_FAILED: "Login Failed",
    ERROR_OCCURRED: "An error occurred during login",
    SIGN_IN_ERROR: "Google sign-in failed",
  };
  

const SCREEN_NAMES ={
    SPLASH :"Splash",
    ADDAPPLIANCES:"AddAppliances" ,
    ADDHOME:"AddHome",
    ADDROOM:"AddRoom",
    ALLHOME:"AllHome",
    APPLIANCE:"Appliance" ,
    CHOOSEHOME:"ChooseHome" ,
    ENTEROTP:"EnterOTP" ,
    ENTERPHONE:"EnterPhone",
    FORGOTPASSWORD:"ForgotPassword" ,
    LOGIN:"Login" ,
    LOGINWITHPAS:"LoginWithPass" ,
    SCHEDULE:"Schedule" ,
    SEEGUEST:"SeeGuest",
    SIGNUP: "SignUp" ,
    UPDATEPROFILE:"UpdateProfile" 
   
}
export {HINTS,SCREEN_NAMES,ERROR}
    



