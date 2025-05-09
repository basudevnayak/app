import React, { useEffect } from "react";
import { Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import {
  config,
  handleGoogleSignInNative,
  handleGoogleSignInWeb,
} from "../../utils/auth/GoogleHelper";

const GoogleSignInButton = () => {
  const navigation = useNavigation<any>();
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (Platform.OS !== "web" && response) {
      handleGoogleSignInNative(promptAsync, response, navigation);
    }
  }, [response]);

  const handleSignIn = () => {
    if (Platform.OS === "web") {
      handleGoogleSignInWeb(navigation);
    } else {
      promptAsync();
    }
  };

  return <Button title="Sign in with Google" onPress={handleSignIn} />;
};

export default GoogleSignInButton;
