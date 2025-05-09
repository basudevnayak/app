import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { ERROR } from '../utils/constants';
import { TC_BackButton } from '../component/TC_BackButton';
import { globalStyles } from '../utils/style';
import { showAlert } from '../utils/alert/Alert';

// Define types for navigation
type RootStackParamList = {
  EnterSIM_IP: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

type EnterSIM_IPNavigationProp = StackNavigationProp<RootStackParamList, 'EnterSIM_IP'>;
type EnterSIM_IPRouteProp = RouteProp<RootStackParamList, 'EnterSIM_IP'>;

type Props = {
  navigation: EnterSIM_IPNavigationProp;
  route: EnterSIM_IPRouteProp;
};

export const EnterSIM_IP: React.FC<Props> = ({ navigation }) => {
  const [simNumber, setSimNumber] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const validateAndSubmit = () => {
    if (!simNumber.trim() || !ipAddress.trim()) {
     showAlert(ERROR.GENERAL_ERROR, ERROR.FIELDS_ERROR);
      return;
    }
    if (!/^\d{10,15}$/.test(simNumber)) {
     showAlert(ERROR.GENERAL_ERROR,ERROR.SIM_NUMBER_ERROR);
      return;
    }
    if (!/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/.test(ipAddress)) {
    showAlert(ERROR.GENERAL_ERROR,ERROR.IP_ADD_ERROR);
      return;
    }
   showAlert(ERROR.GENERAL_ERROR,ERROR.DETAILS_SUBMITTED_ERROR);
  };

  return (
    <View style={globalStyles.column}>
      <TC_BackButton/>
      <Text style={styles.header}>Premise</Text>
      <Text style={styles.label}>Enter Your SIM Number</Text>
      <TextInput style={styles.input} value={simNumber} onChangeText={setSimNumber} keyboardType='numeric' />
      <Text style={styles.label}>Enter Your IP Address</Text>
      <TextInput style={styles.input} value={ipAddress} onChangeText={setIpAddress} keyboardType='numeric' />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={() => { setSimNumber(''); setIpAddress(''); }}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  clearButton: {
    backgroundColor: '#f28b82',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#f28b82',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
});
export default EnterSIM_IP;