import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import {NativeModules} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SmsAndroid from 'react-native-get-sms-android';
import { colors } from '../../utils/theme';
import { showAlert } from '../../utils/alert/Alert';

const Stack = createStackNavigator();
const {SmsModule} = NativeModules;

const SendSMS2 = ({route, navigation}: any) => {
    const {mobileNumber} = route.params;
  
    // Function to request SMS permission (Android)
    const requestSMSPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
              title: 'SMS Permission',
              message: 'This app needs permission to send SMS messages.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
          console.error('SMS Permission Error:', error);
          return false;
        }
      }
      return true; // For iOS (permissions are handled differently)
    };
  
    // Function to send SMS
    const sendSMS = async (message: string) => {
      const hasPermission = await requestSMSPermission();
      if (!hasPermission) {
        showAlert('Permission Denied', 'Cannot send SMS without permission.');
        return;
      }
  
      try {
        const result = await SmsModule.sendSMS(mobileNumber, message);
        showAlert('Success', result);
      } catch (error: any) {
        showAlert('Error', error.message || 'Failed to send SMS.');
      }
    };
  
    return (
      <View style={secondStyles.container}>
        <Text style={secondStyles.mobileText}>Device Number: {mobileNumber}</Text>
  
        <TouchableOpacity
          style={secondStyles.button}
          onPress={() => sendSMS('ARM')}>
          <Text style={secondStyles.buttonText}>ARM</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={secondStyles.button}
          onPress={() => sendSMS('OFFPASSWORD')}>
          <Text style={secondStyles.buttonText}>DISARM</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={secondStyles.button}
          onPress={() => navigation.navigate('SendSMS3', {mobileNumber})}>
          <Text style={secondStyles.buttonText}>Show Messages</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Styles
  const secondStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    mobileText: {
      fontSize: 18,
      marginBottom: 20,
    },
    button: {
      backgroundColor: colors.primary,
      width: '90%',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 12,
      marginTop: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  export default SendSMS2;