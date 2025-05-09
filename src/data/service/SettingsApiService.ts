import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { Logger } from "../../utils/logger";

export interface SettingsPayload {
  name: string;
  description: string;
  theme: "light" | "dark";
  notification: "enabled" | "disabled";
  status: "active" | "inactive";
}

export const updateSettings = async (
  uuid: string,
  payload: SettingsPayload
): Promise<any> => {
  const apiUrl = `${BASE_URL}/settings/${uuid}`;
  try {
    Logger.log("Sending settings update to:", apiUrl, payload);
    const response = await axios.put(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Update failed");
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw new Error(error.response?.data?.message || "Failed to update settings");
    }
    throw error;
  }
};
