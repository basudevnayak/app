import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
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
import { dashBoardService } from "../../data/service/ApiServiceFactory";
import { DashboardCountResponse } from "../../data/models/response";

const { width } = Dimensions.get("window");

const Dashboard: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const drawerAnim = useRef(new Animated.Value(-width)).current;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const [user, setUser] = useState<{ name: string; profilePicture?: string }>({
    name: "",
    profilePicture: "",
  });

  const [userRole, setUserRole] = useState<string>("");

  const [counts, setCounts] = useState({
    banks: 0,
    devices: 0,
    users: 0,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const savedUser = await AsyncStorageHelper.getItem<User>(KEYS.USER);
          Logger.log("Saved user", savedUser);

          if (savedUser) {
            setUser({
              name: savedUser?.name?.trim() || "User",
              profilePicture: savedUser?.profilePicture?.trim() || "",
            });
            setUserRole(savedUser?.role?.trim().toLowerCase() || "");
          }

          const response = await dashBoardService.customGet<DashboardCountResponse>('count');
          setCounts({
            banks: response.data.bank || 0,
            devices: response.data.device || 0,
            users: response.data.users || 0,
          });
        } catch (error) {
          console.error("Dashboard load error:", error);
        }
      };

      loadData();
      return () => {};
    }, [])
  );

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
                user.profilePicture
                  ? user.profilePicture
                  : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
            }}
            style={DashboardStyles.avatar}
          />
          <Text style={DashboardStyles.userName}>{user.name || "User"}</Text>
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
          onPress={() => handleNavigation("NotificationsScreen")}
        >
          <Ionicons name="notifications-outline" size={18} />
          <Text style={DashboardStyles.drawerText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.drawerItem}
          onPress={() => handleNavigation("ProductList")}
        >
          <FontAwesome5 name="desktop" size={18} />
          <Text style={DashboardStyles.drawerText}>Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.drawerItem}
          onPress={() => handleNavigation("Setting")}
        >
          <Ionicons name="settings-outline" size={18} />
          <Text style={DashboardStyles.drawerText}>Setting</Text>
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
          <Text style={DashboardStyles.dashboardText}>DASHBOARD</Text>
          <TouchableOpacity
            onPress={() => handleNavigation("NotificationsScreen")}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={DashboardStyles.welcomeText}>Welcome {user.name}!</Text>

        <TouchableOpacity
          style={DashboardStyles.card}
          onPress={() => handleNavigation("BankList")}
        >
          <FontAwesome5 name="university" size={24} color="black" />
          <Text style={DashboardStyles.cardText}>{counts.banks} BANKS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.card}
          onPress={() => handleNavigation("DeviceList")}
        >
          <FontAwesome5 name="desktop" size={24} color="black" />
          <Text style={DashboardStyles.cardText}>{counts.devices} DEVICES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={DashboardStyles.card}
          onPress={() => {
            if (userRole === "user") {
              showAlert("Access Denied", "You have view-only access.");
            } else {
              handleNavigation("UserList");
            }
          }}
        >
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={DashboardStyles.cardText}>{counts.users} USERS</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Dashboard;