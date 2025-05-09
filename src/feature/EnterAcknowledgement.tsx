import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ERROR } from '../utils/constants';
import { globalStyles } from '../utils/style';
import { TC_BackButton } from '../component/TC_BackButton';
import { showAlert } from '../utils/alert/Alert';

// Define types for navigation
type RootStackParamList = {
  EnterAcknowledgement: undefined;
  ScheduleScreen: undefined;
};

type EnterAcknowledgementNavigationProp = StackNavigationProp<RootStackParamList, 'EnterAcknowledgement'>;
type EnterAcknowledgementRouteProp = RouteProp<RootStackParamList, 'EnterAcknowledgement'>;

type Props = {
  navigation: EnterAcknowledgementNavigationProp;
  route: EnterAcknowledgementRouteProp;
};

const EnterAcknowledgement: React.FC<Props> = ({ navigation }) => {
  const [ackNumber, setAckNumber] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const validateAndSubmit = () => {
    if (!ackNumber.trim() || !ipAddress.trim()) {
     showAlert(ERROR.GENERAL_ERROR, ERROR.FIELDS_ERROR);
      return;
    }
    if (!/^\d{10,15}$/.test(ackNumber)) {
     showAlert(ERROR.GENERAL_ERROR, ERROR.NUMBER_ERROR);
      return;
    }
    if (!/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/.test(ipAddress)) {
     showAlert(ERROR.GENERAL_ERROR, ERROR.IP_ADD_ERROR);
      return;
    }
   showAlert(ERROR.SUCCESS, ERROR.ACKNOWLEDGEMENT_SUCCESS);
  };

  return (
    <View style={globalStyles.column}>
      <TC_BackButton />
      
      <Text style={styles.header}>Premise</Text>
      
      <Text style={styles.label}>Enter Acknowledgement Number</Text>
      <TextInput 
        style={styles.input} 
        value={ackNumber} 
        onChangeText={setAckNumber} 
        keyboardType='numeric' 
      />

      <Text style={styles.label}>Enter Your IP Address</Text>
      <TextInput 
        style={styles.input} 
        value={ipAddress} 
        onChangeText={setIpAddress} 
        keyboardType='default' // Allows both numbers & dots
        autoCapitalize='none'
      />

      {/* Fixed: Removed the empty TouchableOpacity */}
      <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
        <Text style={styles.buttonText}>Validate & Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={() => navigation.navigate("ScheduleScreen")}
      >
        <Text style={styles.buttonText}>Add Acknowledgement</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#f28b82',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default EnterAcknowledgement;
