import React, { useRef, useState, useEffect } from "react";  
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { auth } from "../../firebase/firebase";
import { showAlert } from "../../utils/alert/Alert";
import { DashboardStyles } from "../../utils/styles";
import { KEYS } from "../../utils/constants";
import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { User } from "../../data/models/User";
import { Logger } from "../../utils/logger";

const { width } = Dimensions.get("window");

const UserDashboard: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const drawerAnim = useRef(new Animated.Value(-width)).current;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const [user, setUser] = useState<{ name: string; profilePicture?: string }>({
    name: "",
    profilePicture: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const loadUser = async () => {
        const savedUser = await AsyncStorageHelper.getItem<User>(KEYS.USER);
        Logger.log("Loaded user in UserDashboard:", savedUser);

        if (savedUser) {
          setUser({
            name: savedUser.name?.trim() || "User",
            profilePicture: savedUser.profilePicture?.trim() || "",
          });
        }
      };

      loadUser();
    }, [])
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorageHelper.removeItem(KEYS.USER);
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginOptions" }],
      });
    } catch (error) {
      console.error("Logout failed:", error);
      showAlert("Error", "Failed to logout. Please try again.");
    } finally {
      closeDrawer();
    }
  };

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
    closeDrawer();
  };

  return (
    <View style={DashboardStyles.container}>
      {drawerOpen && (
        <TouchableOpacity
          style={DashboardStyles.overlay}
          onPress={closeDrawer}
        />
      )}

      <Animated.View style={[DashboardStyles.drawer, { left: drawerAnim }]}>
        <View style={DashboardStyles.drawerHeader}>
          <Image
            source={{
              uri:
                user.profilePicture !== ""
                  ? user.profilePicture
                  : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            }}
            style={DashboardStyles.avatar}
          />
          <Text style={DashboardStyles.userName}>{user.name}</Text>
        </View>

        <TouchableOpacity
          style={DashboardStyles.drawerItem}
          onPress={() => handleNavigation("ProfileUpdate")}
        >
          <FontAwesome name="user" size={18} />
          <Text style={DashboardStyles.drawerText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.drawerItem}
          onPress={() => handleNavigation("Setting")}
        >
          <Ionicons name="settings-outline" size={18} />
          <Text style={DashboardStyles.drawerText}>Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.drawerItem}
          onPress={() => handleNavigation("Notification")}
        >
          <Ionicons name="notifications-outline" size={18} />
          <Text style={DashboardStyles.drawerText}>Notifications</Text>
        </TouchableOpacity>

        <View style={DashboardStyles.logoutContainer}>
          <TouchableOpacity
            style={DashboardStyles.logoutBtn}
            onPress={handleLogout}
          >
            <FontAwesome name="sign-out" size={18} color="#fff" />
            <Text style={DashboardStyles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <View style={DashboardStyles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu" size={30} color="black" />
          </TouchableOpacity>
          <Text style={DashboardStyles.dashboardText}>USER DASHBOARD</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Notification" as never)}>
            <Ionicons name="notifications-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={DashboardStyles.scrollContainer}>
          <Text style={DashboardStyles.welcomeText}>Welcome {user.name}!</Text>

          <TouchableOpacity
            style={DashboardStyles.card}
            onPress={() => handleNavigation("DeviceList")}
          >
            <FontAwesome5 name="desktop" size={24} color="black" />
            <Text style={DashboardStyles.cardText}>MY DEVICES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={DashboardStyles.card}
            onPress={() => handleNavigation("BankList")}
          >
            <FontAwesome5 name="university" size={24} color="black" />
            <Text style={DashboardStyles.cardText}>MY BANKS</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default UserDashboard;
