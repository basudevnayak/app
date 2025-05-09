import React from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
import { showAlert } from "../../utils/alert/Alert";
import { DeviceInstallAccept } from "../../utils/styles";

// Validation Schema using Yup
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

const DeviceInstallAcceptScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={DeviceInstallAccept.container}>
      {/* Header Section */}
      <View style={DeviceInstallAccept.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={DeviceInstallAccept.backButton}>
          <Icon name="arrow-back" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>showAlert("Notifications Clicked")}>
          <Icon name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={DeviceInstallAccept.title}>Device Install Request</Text>

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
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            {/* Bank Name */}
            <Text style={DeviceInstallAccept.label}>User Bank Name</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="SBI"
              value={values.bankName}
              onChangeText={handleChange("bankName")}
            />
            {touched.bankName && errors.bankName && <Text style={DeviceInstallAccept.error}>{errors.bankName}</Text>}

            {/* Branch Name */}
            <Text style={DeviceInstallAccept.label}>User Branch Name</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="Agra"
              value={values.branchName}
              onChangeText={handleChange("branchName")}
            />
            {touched.branchName && errors.branchName && <Text style={DeviceInstallAccept.error}>{errors.branchName}</Text>}

            {/* Device Name */}
            <Text style={DeviceInstallAccept.label}>Device Name</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="IOT Device"
              value={values.deviceName}
              onChangeText={handleChange("deviceName")}
            />
            {touched.deviceName && errors.deviceName && <Text style={DeviceInstallAccept.error}>{errors.deviceName}</Text>}

            {/* Phone Number */}
            <Text style={DeviceInstallAccept.label}>Phone Number</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="6399989455"
              keyboardType="numeric"
              maxLength={10}
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
            />
            {touched.phoneNumber && errors.phoneNumber && <Text style={DeviceInstallAccept.error}>{errors.phoneNumber}</Text>}

            {/* Pin Code */}
            <Text style={DeviceInstallAccept.label}>Pin Code Number</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="205142"
              keyboardType="numeric"
              maxLength={6}
              value={values.pinCode}
              onChangeText={handleChange("pinCode")}
            />
            {touched.pinCode && errors.pinCode && <Text style={DeviceInstallAccept.error}>{errors.pinCode}</Text>}

            {/* IFSC Code */}
            <Text style={DeviceInstallAccept.label}>IFSC Code</Text>
            <TextInput
              style={DeviceInstallAccept.input}
              placeholder="205142"
              autoCapitalize="characters"
              value={values.ifscCode}
              onChangeText={handleChange("ifscCode")}
            />
            {touched.ifscCode && errors.ifscCode && <Text style={DeviceInstallAccept.error}>{errors.ifscCode}</Text>}

            {/* Accept Button */}
            <TouchableOpacity style={DeviceInstallAccept.button} onPress={() => handleSubmit()}>
              <Text style={DeviceInstallAccept.buttonText}>Accept</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};



export default DeviceInstallAcceptScreen;
