import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppInput } from "../../component/AppInput";
import { AppButton } from "../../component/AppButton";
import CommonHeader from "../../component/CommonHeader";
import { Logger } from "../../utils/logger";
import axios from "axios";
import { showAlert } from "../../utils/alert/Alert";
import { BASE_URL } from "../../utils/constants";
import AsyncStorageHelper from "../../utils/data/local/AsyncStorageHelper";
import { headerStyles } from "../../utils/theme";


const TOKEN = "Bearer YOUR_TOKEN_HERE";

const EditBank = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bank, onUpdate } = route.params as {
    bank: {
      uuid: string;
      name: string;
      bankCode: string;
      postalAddress: string;
      city: string;
      pinCode: string;
      state: string;
    };
    onUpdate: () => void;
  };

  const [formData, setFormData] = useState({
    name: bank.name,
    bankCode: bank.bankCode,
    postalAddress: bank.postalAddress,
    city: bank.city,
    pinCode: bank.pinCode,
    state: bank.state,
  });

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = (await AsyncStorageHelper.getItem("token")) as string;
      setToken(savedToken || "");
    };
    fetchToken();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/banks/${bank.uuid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        showAlert("Success", "Bank updated successfully!");
        onUpdate?.();
        navigation.goBack();
      } else {
        showAlert("Error", "Failed to update bank.");
      }
    } catch (error) {
      Logger.error("Update error:", error);
      showAlert("Error", "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  const backNavigationHandler = () => navigation.goBack();

  return (
    <View style={headerStyles.mainContainer}>
      <CommonHeader title="Edit Bank" onBackPress={backNavigationHandler} />
      <View style={styles.spacer} />

      {Object.entries(formData).map(([field, value]) => (
        <AppInput
          key={field}
          placeholder={field.replace(/([A-Z])/g, " $1").toLowerCase()}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
        />
      ))}

      <AppButton title="Update Bank" onPress={handleUpdate} loading={loading} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  spacer: {
    marginTop: 16,
  },
});

export default EditBank;
