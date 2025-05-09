// utils/alert/Alert.ts

import { Alert, AlertButton, Platform } from 'react-native';

type ShowAlert = (title: string, message?: string, buttons?: AlertButton[]) => void;

export const showAlert: ShowAlert = (title, message, buttons) => {
  if (Platform.OS === 'web') {
    alert(`${title}: ${message}`);
    
    // ✅ If buttons exist (e.g., navigation callbacks), execute the first one after delay
    if (buttons && buttons[0]?.onPress) {
      setTimeout(() => buttons[0].onPress?.(), 100);
    }

  } else {
    if (buttons && buttons.length > 0) {
      Alert.alert(title, message, buttons, { cancelable: false }); // ✅ Modal-safe
    } else {
      Alert.alert(title, message, [{ text: "OK" }], { cancelable: true }); // ✅ Default OK
    }
  }
};

