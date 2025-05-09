import React, { useState } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { RootStackParamList } from '../../navigation/Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL, HARD_CODED_FUUID } from '../../utils/constants';
import { headerStyles } from '../../utils/theme';
import { showAlert } from '../../utils/alert/Alert';

const AddCommand = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState({
    name: '',
    description: '',
    message: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { name, description, message } = form;

    if (!name.trim() || !description.trim() || !message.trim()) {
      showAlert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const payload = {
        fUuid: HARD_CODED_FUUID,
        name: name.trim(),
        description: description.trim(),
        message: message.trim(),
      };

      await axios.post(`${BASE_URL}/commands`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      showAlert('Success', 'Command added successfully');
      navigation.goBack();
    } catch (err: any) {
      console.error('Command create error:', err.response?.data || err.message);
      showAlert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={headerStyles.mainContainer}>
      <CommonHeader title="Add Command" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <AppInput
            placeholder="Command Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <AppInput
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          <AppInput
            placeholder="Message"
            value={form.message}
            onChangeText={(text) => handleChange('message', text)}
          />
          <AppButton title="Add Command" onPress={handleSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddCommand;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
