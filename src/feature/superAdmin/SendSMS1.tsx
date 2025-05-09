import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CommonHeader from '../../component/CommonHeader';
import { AppInput } from '../../component/AppInput';
import { AppButton } from '../../component/AppButton';
import { RootStackParamList } from '../../navigation/Navigations';
import { showAlert } from '../../utils/alert/Alert';
import { sendSMS } from '../../utils/SMSHelper';

const SendSMS1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SendSMS1'>>();

  const { feature, phoneNumber } = route.params;

  const [command, setCommand] = useState('');

  const handleSend = () => {
    const trimmedCommand = command.trim();

    if (!trimmedCommand) {
      showAlert('Validation Error', 'Command cannot be empty.');
         
               const message = feature.name + trimmedCommand;
               sendSMS(phoneNumber,message);

      return;
    }

    showAlert('Success', 'Command sent successfully');

    // Optional: Reset field
    setCommand('');
  };

  return (
    <View style={styles.mainContainer}>
      <CommonHeader title="Send SMS" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <AppInput
            placeholder="Enter Command"
            value={command}
            onChangeText={setCommand}
          />

          <AppButton
            title="Send"
            onPress={handleSend}
            disabled={!command.trim()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SendSMS1;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    paddingTop: 40,
  },
});
