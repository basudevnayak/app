import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../utils/constants";

const UserService = {
  getUserProfile: async () => {
    const token = await AsyncStorage.getItem("authToken");
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return await res.json();
  },
};

export default UserService;
