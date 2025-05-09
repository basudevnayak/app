import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import UpdateProfileScreen from "./UpdateProfileScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { showAlert } from "../utils/alert/Alert";

interface ScheduleState {
  roomName: string;
  applianceName: string;
  startTime: string;
  endTime: string;
}

type RootStackParamList = {
  UpdateProfile: undefined;
  // add other routes here if needed
};

const ScheduleScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const [schedule, setSchedule] = useState<ScheduleState>({
    roomName: "",
    applianceName: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (field: keyof ScheduleState, value: string) => {
    setSchedule((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const createSchedule = async () => {
    const { roomName, applianceName, startTime, endTime } = schedule;
    try {
      navigation.navigate("UpdateProfile"); // Navigate to Home Screen
    } catch (error) {
      console.error("API Error:", error);
    }
   showAlert(
      "Schedule Created",
      `Room: ${roomName}\nAppliance: ${applianceName}\nStart: ${startTime}\nEnd: ${endTime}`
    );
    navigation.navigate("UpdateProfile");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.label}>Select Your Room Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter room name"
        value={schedule.roomName}
        onChangeText={(text) => handleInputChange("roomName", text)}
      />

      <Text style={styles.label}>Select Your Appliance Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter appliance name"
        value={schedule.applianceName}
        onChangeText={(text) => handleInputChange("applianceName", text)}
      />

      <Text style={styles.label}>Select Start Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter start time"
        value={schedule.startTime}
        onChangeText={(text) => handleInputChange("startTime", text)}
      />

      <Text style={styles.label}>Select End Time:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter end time"
        value={schedule.endTime}
        onChangeText={(text) => handleInputChange("endTime", text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() =>
            setSchedule({
              roomName: "",
              applianceName: "",
              startTime: "",
              endTime: "",
            })
          }
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={createSchedule}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#F28B82",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#F28B82",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ScheduleScreen;
