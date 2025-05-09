import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AddHomeProps } from "../navigation/Navigations";
import { globalStyles } from "../utils/style";
import { TC_Text } from "../component/TC_Text";
import { TC_InputWText } from "../component/TC_TextInputWText";
import { ERROR } from "../utils/constants";
import { TC_BackButton } from "../component/TC_BackButton";

import { v4 as uuidv4 } from "uuid";
import { showAlert } from "../utils/alert/Alert";

const AddHome: React.FC<AddHomeProps> = ({ navigation, route }) => {
  const [premiseName, setPremiseName] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { phone } = route.params;

  // Validation and Navigation Function
  const handleContinue = async () => {
    if (!premiseName.trim()) {
      showAlert(`${ERROR.VALID_ERROR} ${ERROR.PREMISE_NAME_ERROR}`);
      return;
    }

    if (!homeAddress.trim()) {
      showAlert(`${ERROR.VALID_ERROR} ${ERROR.HOME_ADDRESS_ERROR}`);
      return;
    }

    setLoading(true);
    try {
      const shortUUID: string = uuidv4().replace(/-/g, "").substring(0, 8);

      const bankData = {
        bankId: shortUUID,
        bankName: premiseName,
        address: homeAddress,
        owners: [{ phone: phone }],
      };

      const result = await BankService.createBank(bankData);

      if (result) {
       showAlert("Success", "Premise added Successfully!");
        setPremiseName("");
        setHomeAddress("");
        setLoading(false);
        navigation.navigate("AllHome", { phone: phone });
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    showAlert("Success", "Premise added Successfully!");
  };

  return (
    <View style={globalStyles.column}>
      <TC_BackButton />

      {/* Title */}
      <TC_Text style={globalStyles.h1Text} label="Create New Bank"></TC_Text>

      <View style={globalStyles.smallHeight}></View>

      <TC_InputWText
        keyboardTypeOptions={"default"}
        {...{
          label: { label: "Enter Name", style: globalStyles.inputLabel },
          input: {
            label: "Enter Bank Name",
            style: globalStyles.inputText,
          },
          value: premiseName,
          setValue: (text) => {
            setPremiseName(text);
          },
        }}
      />

      <TC_InputWText
        keyboardTypeOptions={"default"}
        {...{
          label: { label: "Enter Address", style: globalStyles.inputLabel },
          input: {
            label: "Enter Bank Address",
            style: globalStyles.inputText,
          },
          value: homeAddress,
          setValue: (text) => {
            setHomeAddress(text);
          },
        }}
      />

      <View style={globalStyles.mediumHeight}></View>

      {/* Continue Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleContinue}>
        <TC_Text style={globalStyles.buttonText} label="Continue"></TC_Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddHome;
