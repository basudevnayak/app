import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../utils/styles";
import { headerStyles } from "../utils/headerStyles";
import { TC_Text } from "../component/TC_Text";
import { colors, spacing } from "../utils/theme";
import { Logger } from "../utils/logger";

const SettingsScreen = () => {
  const [isApplianceOn, setIsApplianceOn] = useState(false);
  const [isPremiseOn, setIsPremiseOn] = useState(false);

  return (
    <View style={globalStyles.container}>
      {/* Header Section */}
      <View style={headerStyles.header}>
        <TC_Text style={styles.settingsText}label="Settings"></TC_Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://www.example.com/profile-logo.png" }}
          style={styles.profileLogo}
        />
        <Text style={styles.profileName}>
          My Profile
          <TouchableOpacity onPress={() => Logger.log("Edit profile")}>
            <Image
              source={{ uri: "https://www.example.com/pencil-logo.png" }}
              style={styles.pencilLogo}
            />
          </TouchableOpacity>
        </Text>
      </View>

      {/* Show Appliance Section */}
      <View style={styles.toggleContainer}>
        <TC_Text style={styles.toggleLabel}label="Show Appliance"></TC_Text>
        <Switch
          value={isApplianceOn}
          onValueChange={() => setIsApplianceOn(!isApplianceOn)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isApplianceOn ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      {/* Switch Premise Section */}
      <View style={styles.toggleContainer}>
        <TC_Text style={styles.toggleLabel}label="Switch Premise"></TC_Text>
        <Switch
          value={isPremiseOn}
          onValueChange={() => setIsPremiseOn(!isPremiseOn)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPremiseOn ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  settingsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  profileLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  pencilLogo: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SettingsScreen;
