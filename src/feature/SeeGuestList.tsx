import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../utils/styles";
import { GuestRoomProps } from "../navigation/Navigation";
import { TC_Text } from "../component/TC_Text";





const GuestScreen: React.FC<GuestRoomProps> = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      {/* Left Corner - Previous Button */}
      <TouchableOpacity
        style={globalStyles.textStyle}
        onPress={() => navigation.goBack()} // Navigate back to the previous screen
      >
        <TC_Text style={globalStyles.textStyle}label="Previous"></TC_Text>
      </TouchableOpacity>

      {/* Middle Section - Existing Guests */}
      <View style={globalStyles.middleSection}>
        <TC_Text style={globalStyles.title}label="Existing Guests"></TC_Text>
        <View style={globalStyles.guestList}>
          <TC_Text style={globalStyles.textStyle}label="Guest 1"></TC_Text>
          <TC_Text style={globalStyles.textStyle}label="Guest 2"></TC_Text>
          <TC_Text style={globalStyles.textStyle}label="Guest 3"></TC_Text>
          <TC_Text style={globalStyles.textStyle}label="Guest 4"></TC_Text>
        </View>
      </View>
    </View>
  );
};



export default GuestScreen;
