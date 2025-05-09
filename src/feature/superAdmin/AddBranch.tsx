import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import CommonHeader from "../../component/CommonHeader";
import { RootStackParamList } from "../../navigation/Navigations";
import { showAlert } from "../../utils/alert/Alert";
import { branchService } from "../../data/service/ApiServiceFactory";
import { bank } from "../../utils/data/local/StorageHelper";

const AddBranch: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "AddBranch">>();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    postalAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { name, code, postalAddress, city, state, pinCode , phone} = formData;

    if (!name || !code || !postalAddress || !city || !state || !pinCode || !phone) {
      showAlert("Error", "All fields are required");
      return;
    }

    setLoading(true);

    try {
      const selectedBank = await bank();
      const response = await branchService.create({
        bankUuid: selectedBank.uuid,
        name,
        code,
        postalAddress,
        city,
        state,
        pinCode,
        phone,
      });

      setLoading(false);
      showAlert("Success", "Branch added successfully");

      const newBranch = response.data;
      navigation.navigate('BranchList', { newBranch });

    } catch (error) {
      setLoading(false);
      console.error("Error adding branch:", error);
      showAlert("Error", "Failed to add branch");
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Add Branch" onBackPress={() => navigation.goBack()} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Branch Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="IFSC Code"
          value={formData.code}
          onChangeText={(text) => handleChange("code", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Address"
          value={formData.postalAddress}
          onChangeText={(text) => handleChange("postalAddress", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => handleChange("city", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={formData.state}
          onChangeText={(text) => handleChange("state", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={formData.pinCode}
          onChangeText={(text) => handleChange("pinCode", text)}
          keyboardType="numeric"
        />
         <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add Branch"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  formContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#FF6B6B",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddBranch;
