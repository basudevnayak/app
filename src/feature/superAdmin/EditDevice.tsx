import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import CommonHeader from "../../component/CommonHeader";
import { showAlert } from "../../utils/alert/Alert";
import { Logger } from "../../utils/logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Picker } from "@react-native-picker/picker";
import { headerStyles } from "../../utils/theme";

interface DeviceFormValues {
  name: string;
  bankId: string;
  branchId: string;
  productId: string;
  description: string;
  simNumber: string;
}

type RootStackParamList = {
  EditDevice: { device: any };
};

type EditDeviceRouteProp = RouteProp<RootStackParamList, "EditDevice">;

const EditDevice: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<EditDeviceRouteProp>();
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);

  const { device } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeviceFormValues>({
    defaultValues: {
      name: device?.name || "",
      bankId: device?.bankId || "",
      branchId: device?.branchId || "",
      productId: device?.productId || "",
      description: device?.description || "",
      simNumber: device?.simNumber || "",
    },
  });

  useEffect(() => {
    fetchBanks();
    fetchBranches();
    fetchProducts();
  }, []);

  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/master/filter?type=Bank`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanks(res.data?.data || []);
    } catch (err) {
      Logger.error("Fetch banks error:", err);
    }
  };

  const fetchBranches = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`http://techlambda.com:7500/branches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(res.data?.data || []);
    } catch (err) {
      Logger.error("Fetch branches error:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/product`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data?.data || []);
    } catch (err) {
      Logger.error("Fetch products error:", err);
    }
  };

  const onSubmit: SubmitHandler<DeviceFormValues> = async (values) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(`${BASE_URL}/devices/${device._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      showAlert("Success", "Device updated successfully");
      navigation.goBack();
    } catch (err) {
      Logger.error("Update device error:", err);
      showAlert("Error", "Failed to update device");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof DeviceFormValues,
    placeholder: string,
    required = false,
    multiline = false
  ) => (
    <Controller
      control={control}
      name={name}
      rules={required ? { required: `${placeholder} is required` } : {}}
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            multiline={multiline}
          />
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
          )}
        </>
      )}
    />
  );

  const renderPicker = (
    name: keyof DeviceFormValues,
    items: { label: string; value: string }[],
    placeholder: string
  ) => (
    <Controller
      control={control}
      name={name}
      rules={{ required: `Please select ${placeholder.toLowerCase()}` }}
      render={({ field: { onChange, value } }) => (
        <>
          <View style={styles.inputContainer}>
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label={`Select ${placeholder}`} value="" />
              {items.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name]?.message as string}</Text>
          )}
        </>
      )}
    />
  );

  return (
    <SafeAreaView style={headerStyles.mainContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <CommonHeader title="Edit Device" onBackPress={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.subHeaderText}>Update Device Details</Text>

          {renderPicker(
            "bankId",
            banks.map((bank) => ({ label: bank.name, value: bank._id })),
            "Bank"
          )}

          {renderPicker(
            "branchId",
            branches.map((branch) => ({ label: branch.name, value: branch._id })),
            "Branch"
          )}

          {renderPicker(
            "productId",
            products.map((p) => ({ label: p.name, value: p.uuid })),
            "Product"
          )}
          {renderInput("name", "Device Name", true)}
          {renderInput("description", "Description", false, true)}
          {renderInput("simNumber", "SIM Number")}

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Update Device</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditDevice;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 4,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
