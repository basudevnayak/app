import { Platform } from "react-native";
import { signInWithPopup } from "firebase/auth";
import AsyncStorageHelper from "../data/local/AsyncStorageHelper";
import { auth, googleProvider } from "../../firebase/firebase";
import { showAlert } from "../alert/Alert";
import { LOGIN_STRINGS } from "../constants";
import { Logger } from "../logger";
import * as AuthSession from "expo-auth-session";

 export  const config: AuthSession.AuthRequestConfig = {
    clientId: Platform.select({
      android: "676486406910-ut2m0v33c4kvg2pfi4p3r5666j5bikdd.apps.googleusercontent.com",
      web: "1088940680500-rvmto1odfulhnsujpecs7c43mqq396j3.apps.googleusercontent.com",
    }),
    redirectUri: AuthSession.makeRedirectUri({ native: "homeautomationapp:/oauthredirect" }),
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",
    usePKCE: false,
  };
export const handleGoogleSignInNative = async (
  promptAsync: () => Promise<any>,
) => {
  try {
    Logger.log("📱 Native Google Sign-In initiated");
    const result = await promptAsync();
    return result;
  } catch (error: any) {
    Logger.error("❌ Native Google Sign-In error:", error);
    showAlert("Sign-In Error", error.message || LOGIN_STRINGS.SIGN_IN_ERROR);
    return null;
  }
};

export const handleGoogleSignInWeb = async (
  navigation: any,
) => {
  try {
    Logger.log("🌐 Web Google Sign-In initiated");
    const result = await signInWithPopup(auth, googleProvider);
    await AsyncStorageHelper.setItem("user", result);
    navigation.navigate("Dashboard");
  } catch (error: any) {
    Logger.error("❌ Web Google Sign-In error:", error);
    showAlert("Sign-In Error", error.message || LOGIN_STRINGS.SIGN_IN_ERROR);
  }
};
