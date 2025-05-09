import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/Ionicons";
import { showAlert } from "../../utils/alert/Alert";
import { InstallationStatus } from "../../utils/styles";

// Validation Schema
const validationSchema = Yup.object().shape({
  installationStatus: Yup.string().required("Installation status is required"),
});

const InstallationStatusScreen = () => {
  const navigation = useNavigation();
  const [installationStatus, setInstallationStatus] = useState("");

  return (
    <View style={InstallationStatus.container}>
      {/* Header */}
      <View style={InstallationStatus.header}>
        <Text style={InstallationStatus.title}>Installation Status</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{ installationStatus: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         showAlert("Success", `Installation Status: ${values.installationStatus}`);
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            {/* Installation Button */}
            <TouchableOpacity
              style={InstallationStatus.button}
              onPress={() => {
                setInstallationStatus("Installation");
                setFieldValue("installationStatus", "Installation");
              }}
            >
              <Text style={InstallationStatus.buttonText}>Installation</Text>
            </TouchableOpacity>

            {/* Not Done Button */}
            <TouchableOpacity
              style={InstallationStatus.button}
              onPress={() => {
                setInstallationStatus("Not done");
                setFieldValue("installationStatus", "Not done");
              }}
            >
              <Text style={InstallationStatus.buttonText}>Not done</Text>
            </TouchableOpacity>

            {/* Done Button */}
            <TouchableOpacity
              style={InstallationStatus.button}
              onPress={() => {
                setInstallationStatus("Done");
                setFieldValue("installationStatus", "Done");
              }}
            >
              <Text style={InstallationStatus.buttonText}>Done</Text>
            </TouchableOpacity>

            {/* Validation Error Message */}
            {touched.installationStatus && errors.installationStatus && (
              <Text style={InstallationStatus.error}>{errors.installationStatus}</Text>
            )}

            {/* Submit Button (Fixed handleSubmit) */}
            <TouchableOpacity style={InstallationStatus.button} onPress={() => handleSubmit()}>
              <Text style={InstallationStatus.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      {/* Previous Button */}
      <TouchableOpacity
        style={InstallationStatus.previousButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={InstallationStatus.previousButtonText}>← Previous</Text>
      </TouchableOpacity>
    </View>
  );
};



export default InstallationStatusScreen;
