import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import type { PremiseNameProps } from "../navigation/Navigation";
import { globalStyles } from "../utils/style";
import { TC_BackButton } from "../component/TC_BackButton";
import { TC_Text } from "../component/TC_Text";

export const PremiseName: React.FC<PremiseNameProps> = ({
  navigation,
  route,
}) => {
  const { deviceData } = route.params;

  return (
    <View style={globalStyles.column}>
      <TC_BackButton />

      <View style={globalStyles.rowEnd}>
        {/* Logout Button */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditDeleteAppliance", {
              deviceData: deviceData
            })
          }
          style={globalStyles.shortButton}
        >
          <TC_Text
            style={globalStyles.buttonText}
            label="Edit Device"
          ></TC_Text>
        </TouchableOpacity>
      </View>

      <Image
        style={globalStyles.image}
        source={require("../../assets/fire sensor.png")}
      />

      <View style={globalStyles.rowCenter}>
        <Text style={globalStyles.h1Text}>Fire Sensor</Text>
      </View>

      {/* First Row ARM And DISARM */}
      <View style={globalStyles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FirstScreen")}
          style={globalStyles.boxRectangle}
        >
          <Text style={globalStyles.buttonText}>ARM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("FirstScreen")}
          style={globalStyles.boxRectangle}
        >
          <Text style={globalStyles.buttonText}>DISARM</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.verySmallHeight} />

      {/* Button Basic Device Config */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("EnterSIM_IP")}
      >
        <Text style={globalStyles.buttonText}>Basic Device Configuration</Text>
      </TouchableOpacity>

      <View style={globalStyles.verySmallHeight} />

      {/* Button Advanced Device Config */}
      <TouchableOpacity style={globalStyles.button} onPress={() => {}}>
        <Text style={globalStyles.buttonText}>Sensor Configuration</Text>
      </TouchableOpacity>

      <View style={globalStyles.verySmallHeight} />

      {/* Button Add Acknowledgement Number */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("EnterAcknowledgement")}
      >
        <Text style={globalStyles.buttonText}>Acknowledgement Number</Text>
      </TouchableOpacity>

      <View style={globalStyles.verySmallHeight} />

      {/* Button Voice Call Configuration */}
      <TouchableOpacity style={globalStyles.button} onPress={() => {}}>
        <Text style={globalStyles.buttonText}>Voice Call Configuration</Text>
      </TouchableOpacity>

      <View style={globalStyles.verySmallHeight} />

      {/* Button Scheduling */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => {
          navigation.navigate("ScheduleScreen");
        }}
      >
        <Text style={globalStyles.buttonText}>Scheduling</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PremiseName;
