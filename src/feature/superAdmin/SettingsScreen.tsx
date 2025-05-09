import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateSettings } from "../../data/service/SettingsApiService";
import { showAlert } from "../../utils/alert/Alert";
import { ERROR } from "../../utils/constants";
import CommonHeader from "../../component/CommonHeader";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [notification, setNotification] = useState<"enabled" | "disabled">("enabled");

  const handleSave = async () => {
    try {
      const payload = {
        theme,
        notification,
        name: "Default Name",
        description: "Default Description",
        status: "active" as "active" | "inactive",
      };

      const uuid = "60e84a8f-3e51-4b96-8b85-59af82f71fce";

      const response = await updateSettings(uuid, payload);
      showAlert(ERROR.SUCCESS, response.message || ERROR.SETTINGS_UPDATE_SUCCESS);
    } catch (error: any) {
      console.error(error);
      showAlert(ERROR.GENERAL_ERROR, error.message || ERROR.SETTINGS_UPDATE_FAILED);
    }
  };

  // ✅ Use goBack to correctly navigate back
  const backPressHandler = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <CommonHeader title="Settings" onBackPress={backPressHandler} />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Theme</Text>
        <View style={styles.switchRow}>
          <Text>{theme === "dark" ? "Dark" : "Light"}</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={(value) => setTheme(value ? "dark" : "light")}
          />
        </View>

        <Text style={styles.label}>Notification</Text>
        <View style={styles.switchRow}>
          <Text>{notification === "enabled" ? "Enabled" : "Disabled"}</Text>
          <Switch
            value={notification === "enabled"}
            onValueChange={(value) => setNotification(value ? "enabled" : "disabled")}
          />
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  saveButton: {
    backgroundColor: "#f8b3b3",
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});