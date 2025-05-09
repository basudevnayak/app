import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DashboardSystemIntegrator } from "../../utils/styles";
import { Logger } from "../../utils/logger";

const { width } = Dimensions.get("window");

const DashboardSystemIntegratorScreen: React.FC = () => {
  // Using the Single Responsibility principle (SOLID), keep animation and user data separate in different states.
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const drawerAnim = useRef(new Animated.Value(-width)).current;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();

  // Gang-of-Four "Factory Method" or "Builder" patterns could be used if retrieving user from complex data sources.
  // For simplicity, a direct API call (UserService) is used here.
  const [user, setUser] = useState<{ name?: string }>({ name: "" });

  // Example side effect to fetch user info
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const fetchUser = async () => {
      try {
        // You can validate the response from the server here and handle it accordingly
        // const userData = await UserService.getUserProfile();
        // if (!userData || !userData.name) {
        //   throw new Error("Invalid user data"); // Basic validation
        // }
        // setUser(userData);
      } catch (error) {
        // Example of error handling
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, [fadeAnim]);

  // Drawer functions
  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(drawerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setDrawerOpen(false));
  };

  // Navigation handlers, with additional basic error handling or checks as needed
  const handleLogout = () => {
    try {
      // If there's any validation needed (e.g., user is logged in), do it here
      Logger.log("Logged out");
      // Add any real logout logic, e.g., clear tokens, etc.
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      closeDrawer();
    }
  };

  const handleUpdateProfile = () => {
    navigation.navigate("UpdateProfile" as never);
    closeDrawer();
  };

  const handleNotifications = () => {
    navigation.navigate("NotificationsScreen" as never);
    closeDrawer();
  };

  const handleDevices = () => {
    navigation.navigate("DeviceList" as never);
    closeDrawer();
  };

  const handleSetting = () => {
    // Navigate to a "Setting" or "SettingsScreen" (update as needed)
    navigation.navigate("SettingsScreen" as never);
    closeDrawer();
  };

  return (
    <View style={DashboardSystemIntegrator.container}>
      {/* Overlay behind drawer */}
      {drawerOpen && (
        <TouchableOpacity style={DashboardSystemIntegrator.overlay} onPress={closeDrawer} />
      )}

      {/* Animated Drawer */}
      <Animated.View style={[DashboardSystemIntegrator.drawer, { left: drawerAnim }]}>
        <View style={DashboardSystemIntegrator.drawerHeader}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=2" }}
            style={DashboardSystemIntegrator.avatar}
          />
          <Text style={DashboardSystemIntegrator.userName}>{user.name || "Username"}</Text>
          <TouchableOpacity style={DashboardSystemIntegrator.bellIcon} onPress={handleNotifications}>
            <Ionicons name="notifications-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* Drawer Items */}
        <TouchableOpacity style={DashboardSystemIntegrator.drawerItem} onPress={handleUpdateProfile}>
          <FontAwesome name="user" size={18} />
          <Text style={DashboardSystemIntegrator.drawerText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Newly added missing fields below */}
        <TouchableOpacity style={DashboardSystemIntegrator.drawerItem} onPress={handleNotifications}>
          <Ionicons name="notifications-outline" size={18} />
          <Text style={DashboardSystemIntegrator.drawerText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={DashboardSystemIntegrator.drawerItem} onPress={handleDevices}>
          <FontAwesome5 name="desktop" size={18} />
          <Text style={DashboardSystemIntegrator.drawerText}>Devices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={DashboardSystemIntegrator.drawerItem} onPress={handleSetting}>
          <Ionicons name="settings-outline" size={18} />
          <Text style={DashboardSystemIntegrator.drawerText}>Setting</Text>
        </TouchableOpacity>

        {/* Logout at bottom */}
        <View style={DashboardSystemIntegrator.logoutContainer}>
          <TouchableOpacity style={DashboardSystemIntegrator.logoutBtn} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={18} color="#fff" />
            <Text style={DashboardSystemIntegrator.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Content */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {/* Header */}
        <View style={DashboardSystemIntegrator.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <Text style={DashboardSystemIntegrator.dashboardText}>DASHBOARD</Text>
          <TouchableOpacity onPress={handleNotifications}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <Text style={DashboardSystemIntegrator.welcomeText}>
          Welcome{user?.name ? ` ${user.name}` : ""}!
        </Text>

        {/* Cards */}
        <TouchableOpacity
          style={DashboardSystemIntegrator.card}
          onPress={() => navigation.navigate("BankList" as never)}
        >
          <FontAwesome5 name="university" size={24} color="black" />
          <Text style={DashboardSystemIntegrator.cardText}>TOTAL BANKS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardSystemIntegrator.card}
          onPress={() => navigation.navigate("DeviceList" as never)}
        >
          <FontAwesome5 name="desktop" size={24} color="black" />
          <Text style={DashboardSystemIntegrator.cardText}>TOTAL DEVICES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardSystemIntegrator.card}
          onPress={() => navigation.navigate("UserList" as never)}
        >
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={DashboardSystemIntegrator.cardText}>TOTAL USERS</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};



export default DashboardSystemIntegratorScreen;