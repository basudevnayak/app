import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { showAlert } from "../../utils/alert/Alert";
import { DeviceInstall as DeviceInstallStyles } from "../../utils/styles";

const validationSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank name is required"),
  branchName: Yup.string().required("Branch name is required"),
  deviceName: Yup.string().required("Device name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, "Pin code must be 6 digits")
    .required("Pin code is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/i, "Invalid IFSC Code")
    .required("IFSC Code is required"),
});

const DeviceInstall = () => {
  const navigation = useNavigation();
  const [bankOpen, setBankOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [deviceOpen, setDeviceOpen] = useState(false);

  const bankOptions = [
    { label: "Bank A", value: "bank_a" },
    { label: "Bank B", value: "bank_b" },
  ];

  const branchOptions = [
    { label: "Branch X", value: "branch_x" },
    { label: "Branch Y", value: "branch_y" },
  ];

  const deviceOptions = [
    { label: "Device 1", value: "device_1" },
    { label: "Device 2", value: "device_2" },
  ];

  return (
    <View style={DeviceInstallStyles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={DeviceInstallStyles.backButton}>
        <Icon name="arrow-back" size={18} color="black" />
      </TouchableOpacity>

      <Text style={DeviceInstallStyles.title}>Device Install Request</Text>

      <Formik
        initialValues={{
          bankName: "",
          branchName: "",
          deviceName: "",
          phoneNumber: "",
          pinCode: "",
          ifscCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         showAlert("Success", JSON.stringify(values, null, 2));
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            {/* Bank Name */}
            <Text style={DeviceInstallStyles.label}>Select User Bank Name</Text>
            <DropDownPicker
              open={bankOpen}


              setOpen={setBankOpen}
              items={bankOptions}
              value={values.bankName}
              setValue={(val) => setFieldValue("bankName", val)}
              placeholder="-Select-"
              style={DeviceInstallStyles.dropdown}
            />
            {touched.bankName && errors.bankName && <Text style={DeviceInstallStyles.error}>{errors.bankName}</Text>}

            {/* Branch Name */}
            <Text style={DeviceInstallStyles.label}>Select User Branch Name</Text>
            <DropDownPicker
              open={branchOpen}
              setOpen={setBranchOpen}
              items={branchOptions}
              value={values.branchName}
              setValue={(val) => setFieldValue("branchName", val)}
              placeholder="-Select-"
              style={DeviceInstallStyles.dropdown}
            />
            {touched.branchName && errors.branchName && <Text style={DeviceInstallStyles.error}>{errors.branchName}</Text>}

            {/* Device Name */}
            <Text style={DeviceInstallStyles.label}>Select Device Name</Text>
            <DropDownPicker
              open={deviceOpen}
              setOpen={setDeviceOpen}
              items={deviceOptions}
              value={values.deviceName}
              setValue={(val) => setFieldValue("deviceName", val)}
              placeholder="-Select-"
              style={DeviceInstallStyles.dropdown}
            />
            {touched.deviceName && errors.deviceName && <Text style={DeviceInstallStyles.error}>{errors.deviceName}</Text>}

            {/* Phone Number */}
            <Text style={DeviceInstallStyles.label}>Enter Phone Number</Text>
            <TextInput
              style={DeviceInstallStyles.input}
              placeholder="Enter phone number"
              keyboardType="numeric"
              maxLength={10}
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
            />
            {touched.phoneNumber && errors.phoneNumber && <Text style={DeviceInstallStyles.error}>{errors.phoneNumber}</Text>}

            {/* Pin Code */}
            <Text style={DeviceInstallStyles.label}>Enter Pin code Number</Text>
            <TextInput
              style={DeviceInstallStyles.input}
              placeholder="Enter pin code"
              keyboardType="numeric"
              maxLength={6}
              value={values.pinCode}
              onChangeText={handleChange("pinCode")}
            />
            {touched.pinCode && errors.pinCode && <Text style={DeviceInstallStyles.error}>{errors.pinCode}</Text>}

            {/* IFSC Code */}
            <Text style={DeviceInstallStyles.label}>IFSC Code</Text>
            <TextInput
              style={DeviceInstallStyles.input}
              placeholder="Enter IFSC code"
              autoCapitalize="characters"
              value={values.ifscCode}
              onChangeText={handleChange("ifscCode")}
            />
            {touched.ifscCode && errors.ifscCode && <Text style={DeviceInstallStyles.error}>{errors.ifscCode}</Text>}

            {/* Submit Button */}
            <TouchableOpacity style={DeviceInstallStyles.button} onPress={() => handleSubmit()}>
              <Text style={DeviceInstallStyles.buttonText}>Send Request</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};



export default DeviceInstall;
