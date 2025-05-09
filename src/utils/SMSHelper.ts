import {
    NativeModules,
  PermissionsAndroid,
  Platform 
} from "react-native";
import { showAlert } from "./alert/Alert";
const { SmsModule } = NativeModules;
const requestSMSPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: "SMS Permission",
            message: "This app needs permission to send SMS messages.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error("SMS Permission Error:", error);
        return false;
      }
    }
    return true; // For iOS (permissions are handled differently)
  };

    export const sendSMS = async (mobileNumber:string,message: string) => {
      const hasPermission = await requestSMSPermission();
      if (!hasPermission) {
       showAlert("Permission Denied", "Cannot send SMS without permission.");
        return;
      }
  
      try {
        const result = await SmsModule.sendSMS(mobileNumber, message);
       showAlert("Success", result);
      } catch (error: any) {
       showAlert("Error", error.message || "Failed to send SMS.");
      }
    };
  