import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../utils/style";
import { ChooseHomeProps } from "../navigation/Navigation";
import { TC_Text } from "../component/TC_Text";
import { TC_Header } from "../component/TC_Header";
import { colors, spacing } from "../utils/theme";
import app_icon from "../../assets/app_icon.png";
import UserService from "../data/service/userService";

const ChooseHomeScreen: React.FC<ChooseHomeProps> = ({ navigation, route }) => {
  const { phone } = route.params;

  // State to store user data
  const [user, setUser] = useState<{ name?: string }>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View>
      <View style={globalStyles.verySmallHeight} />

      <View style={globalStyles.rowEnd}>
        {/* Logout Button */}
        <TouchableOpacity style={globalStyles.shortButton}>
          <Ionicons name="log-out" size={24} color={colors.white} />
          <TC_Text style={globalStyles.buttonText} label="LogOut"></TC_Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.verySmallHeight} />

      {/* Logo */}
      <Image source={app_icon} style={globalStyles.image} />

      <View style={globalStyles.column}>
        {/* Center Text */}
        <TC_Text
          style={globalStyles.h1Text}
          label={`Hi ${user.name || "User"}`}
        ></TC_Text>

        <TC_Text
          style={globalStyles.normalText}
          label="Select how you would like to proceed towards your smarter Bank"
        ></TC_Text>

        <View style={globalStyles.smallHeight}></View>

        {/* Button 1 */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AllHome", { phone: phone })}
          style={globalStyles.chooseBox}
        >
          <Ionicons name="person-add" size={24} color="#000" />
          <TC_Text
            style={globalStyles.buttonText}
            label="Join Existing Bank"
          ></TC_Text>
        </TouchableOpacity>

        <View style={globalStyles.smallHeight}></View>

        {/* Button 2 */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddHome", { phone: phone })}
          style={globalStyles.chooseBox}
        >
          <Image
            style={globalStyles.icon}
            source={require("../../assets/double_person.png")}
          />
          <TC_Text
            style={globalStyles.buttonText}
            label="Add New Bank"
          ></TC_Text>
        </TouchableOpacity>

        <View style={globalStyles.largeHeight}></View>
      </View>
    </View>
  );
};

export default ChooseHomeScreen;
