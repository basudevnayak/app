import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { showAlert } from '../utils/alert/Alert';

interface FormData {
  simNumber: string;
  confirmSimNumber: string;
}

const ConfigureScreen: React.FC = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSubmit = (data: FormData) => {
   showAlert('Success', `SIM Number: ${data.simNumber}`);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.label}>Enter Your SIM Number</Text>
      <Controller
        control={control}
        name="simNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={15}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Confirm Your SIM Number</Text>
      <Controller
        control={control}
        name="confirmSimNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={15}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={() => reset()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#F28B82',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#F28B82',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfigureScreen;
