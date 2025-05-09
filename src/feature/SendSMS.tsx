
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import { NativeModules } from "react-native";
//import SmsAndroid from 'react-native-get-sms-android';
import { colors } from "../utils/theme";
import { globalStyles } from "../utils/style";
import { TC_InputWText } from "../component/TC_TextInputWText";
import { TC_BackButton } from "../component/TC_BackButton";
import { showAlert } from "../utils/alert/Alert";

const { SmsModule } = NativeModules;

const FirstScreen = ({ navigation }: any) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateMobileNumber = (text: string) => {
    if (!/^\d*$/.test(text)) {
      setErrorMessage("Only numbers are allowed.");
    } else if (text.length > 10) {
      setErrorMessage("Mobile number must be 10 digits.");
    } else {
      setErrorMessage("");
    }
    setMobileNumber(text);
  };

  return (
    <View style={globalStyles.column}>
      <TC_BackButton />

      <View style={globalStyles.smallHeight} />

      {/* Phone Input */}
      <TC_InputWText
        keyboardTypeOptions={"number-pad"}
        {...{
          label: {
            label: "Enter Your Device No.",
            style: globalStyles.inputLabel,
          },
          input: {
            label: "+91 Enter Your Device Number",
            style: globalStyles.inputText,
          },
          value: mobileNumber,
          setValue: (text) => validateMobileNumber(text),
          maxLength: 10,
        }}
      />

      {/* Error Message (Ensures consistent spacing) */}
      <Text style={[globalStyles.errorText, { opacity: errorMessage ? 1 : 0 }]}>
        {errorMessage || " "}
      </Text>

      <View style={globalStyles.mediumHeight} />

      {/* Next Button */}
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            backgroundColor:
              mobileNumber.length === 10 ? colors.primary : "#AAA",
          },
        ]}
        onPress={() => navigation.navigate("SecondScreen", { mobileNumber })}
        disabled={mobileNumber.length !== 10}
      >
        <Text style={globalStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const SecondScreen = ({ route, navigation }: any) => {
  const { mobileNumber } = route.params;
  const [customMobileNumber, setCustomMobileNumber] = useState("");
  const [customAddress, setCustomAddress] = useState("");

  // Function to request SMS permission (Android)
  const requestSMSPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          {
            title: "SMS Permission",
            message: "This app needs permission to send SMS messages.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error("SMS Permission Error:", error);
        return false;
      }
    }
    return true; // For iOS (permissions are handled differently)
  };

  // Function to send SMS
  const sendSMS = async (message: string) => {
    const hasPermission = await requestSMSPermission();
    if (!hasPermission) {
     showAlert("Permission Denied", "Cannot send SMS without permission.");
      return;
    }

    try {
      const result = await SmsModule.sendSMS(mobileNumber, message);
     showAlert("Success", result);
    } catch (error: any) {
     showAlert("Error", error.message || "Failed to send SMS.");
    }
  };

  return (
    <View style={globalStyles.column}>


      <TC_BackButton/>

      <View style={globalStyles.smallHeight}/>

      <Text style={globalStyles.normalText}>Device Number: {mobileNumber}</Text>

      <View style={globalStyles.smallHeight} />

      {/* Mobile Number Input */}
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={customMobileNumber}
        onChangeText={setCustomMobileNumber}
      />
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS(`MOB${customMobileNumber}`)}
        disabled={!customMobileNumber}
      >
        <Text style={globalStyles.buttonText}>Add Mobile Number</Text>
      </TouchableOpacity>


      <View style={globalStyles.smallHeight} />

      {/* Address Input */}
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Address for Zone 1"
        value={customAddress}
        onChangeText={setCustomAddress}
      />
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS(`ADDR1${customAddress}`)}
        disabled={!customAddress}
      >
        <Text style={globalStyles.buttonText}>Set Zone 1 Address</Text>
      </TouchableOpacity>

      <View style={globalStyles.smallHeight} />

      {/* Predefined Commands */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS("ARM")}
      >
        <Text style={globalStyles.buttonText}>ARM</Text>
      </TouchableOpacity>

      <View style={globalStyles.smallHeight} />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS("OFFPASSWORD")}
      >
        <Text style={globalStyles.buttonText}>DISARM</Text>
      </TouchableOpacity>

      <View style={globalStyles.smallHeight} />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS("MSGR")}
      >
        <Text style={globalStyles.buttonText}>Record Voice Message</Text>
      </TouchableOpacity>

      <View style={globalStyles.smallHeight} />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => sendSMS("MSGP")}
      >
        <Text style={globalStyles.buttonText}>Listen to Voice Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const ThirdScreen = ({ route }: any) => {
  const { mobileNumber } = route.params;
  const formattedNumber = `+91${mobileNumber}`;

  const [smsData, setSmsData] = useState<{ timestamp: number; body: string }[]>(
    []
  );

  // Request SMS Read Permission for Android
  const requestSMSReadPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "SMS Read Permission",
            message: "This app needs permission to read messages.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error("Permission Error:", error);
        return false;
      }
    }
    return true;
  };

  // Fetch SMS (Inbox & Sent) Filtered to Phone Number
  const fetchSMS = async () => {
    const hasPermission = await requestSMSReadPermission();
    if (!hasPermission) {
     showAlert("Permission Denied", "Cannot read SMS without permission.");
      return;
    }

    const filter = {
      box: "inbox",
      maxCount: 10,
      address: formattedNumber,
    };

    let allMessages: { timestamp: number; body: string; phone: string }[] = [];

    /* SmsAndroid.list(
      JSON.stringify(filter),
      (fail: any) => {
       showAlert('Failed with this error: ' + fail);
      },
      (count: any, smsList: any) => {
        if (count > 0) {
          const messages = JSON.parse(smsList);
          allMessages = messages.map(
            (msg: {body: string; date: string; service_center: string}) => ({
              timestamp: parseInt(msg.date), // Convert timestamp
              body: msg.body,
              phone: msg.service_center,
            }),
          );

          // Sort messages by date (Newest first)
          allMessages.sort((a, b) => b.timestamp - a.timestamp);

          // Update state with formatted messages
          setSmsData(allMessages);
        } else {
          setSmsData([]);
        }
      },
    );*/
  };

  useEffect(() => {
    fetchSMS();
  }, []);

  return (
    <View style={globalStyles.column}>
      {smsData.length === 0 ? (
        <Text style={globalStyles.normalText}>No messages found.</Text>
      ) : (
        <FlatList
          data={smsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <Text style={globalStyles.normalText}>{item.body}</Text>
              <Text style={globalStyles.normalText}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export { FirstScreen, SecondScreen, ThirdScreen };
