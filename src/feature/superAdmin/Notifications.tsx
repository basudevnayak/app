import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Commanhandler from "../../component/CommonHeader";

// Dummy notifications for display
const dummyNotifications = [
  {
    id: "1",
    title: "New Device Added",
    message: "A new device was added to your account.",
    timestamp: "2025-04-09 10:00 AM",
  },
  {
    id: "2",
    title: "Profile Updated",
    message: "Your profile information has been updated.",
    timestamp: "2025-04-08 04:30 PM",
  },
  {
    id: "3",
    title: "New Login",
    message: "You logged in from a new device.",
    timestamp: "2025-04-07 09:15 PM",
  },
];

const Notifications: React.FC = () => {
  const navigation = useNavigation();

  const handleNotifications = () => {
    navigation.navigate("Notifications" as never); 
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  const backPressHandler = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Commanhandler title="Notifications" onBackPress={backPressHandler} />
      <FlatList
        data={dummyNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Ionicons name="notifications" size={24} color="#333" />
            <View style={styles.textContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  textContent: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default Notifications;
