import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import { ERROR } from '../utils/constants';
import { showAlert } from '../utils/alert/Alert';

// Define types for navigation
type RootStackParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleEventSelection = (event: string) => {
    setSelectedEvent(event);
  };

  const handleSubmit = () => {
    if (!selectedEvent) {
     showAlert(ERROR.VALID_ERROR,ERROR.EVENT_ERROR);
      return;
    }
   showAlert(ERROR.SUCCESS, `${ERROR.SUBMITTED}: ${selectedEvent}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Premise</Text>
      <TouchableOpacity
        style={[styles.eventButton, selectedEvent === 'Fire Event' && styles.selected]}
        onPress={() => handleEventSelection('Fire Event')}
      >
        <Text style={styles.eventText}>Fire Event</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.eventButton, selectedEvent === 'LPG Leakage' && styles.selected]}
        onPress={() => handleEventSelection('LPG Leakage')}
      >
        <Text style={styles.eventText}>LPG Leakage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Previous</Text>
      </TouchableOpacity>
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
  eventButton: {
    width: 250,
    padding: 15,
    backgroundColor: '#f28b82',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  selected: {
    backgroundColor: '#d32f2f',
  },
  eventText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#600',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#f28b82',
    padding: 10,
    borderRadius: 5,
    width: '100%',
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
