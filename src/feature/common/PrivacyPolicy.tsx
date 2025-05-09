import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigations';
import { fetchPrivacyPolicy } from '../../data/service/P&PApiService';
import { PrivacyPolicyResponse } from '../../data/models/PrivacyPolicy';
import { showAlert } from '../../utils/alert/Alert';
import { PrivacyPolicyStyle } from '../../utils/styles';
import { Logger } from '../../utils/logger';
import Commanhandler from '../../component/CommonHeader'; // Adjusted the path to the correct location

type PrivacyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PrivacyPolicy = () => {
  const navigation = useNavigation<PrivacyScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [privacyData, setPrivacyData] = useState<PrivacyPolicyResponse | null>(null);

  useEffect(() => {
    loadPrivacyPolicy();
  }, []);

  const loadPrivacyPolicy = async () => {
    try {
      Logger.log('Starting to load privacy policy...');
      const response = await fetchPrivacyPolicy();
      Logger.log('Received privacy policy:', response);
      
      if (!response || !response.data) {
        throw new Error('Invalid response structure from server');
      }
      
      setPrivacyData(response);
      setError(null);
    } catch (err) {
      console.error('Error in PrivacyPolicy component:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load privacy policy. Please try again later.';
      setError(errorMessage);
     showAlert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={PrivacyPolicyStyle.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={PrivacyPolicyStyle.centerContainer}>
        <Text style={PrivacyPolicyStyle.errorText}>{error}</Text>
      </View>
    );
  }
  const backPressHandler = () => navigation.goBack();
  return (
    <View style={PrivacyPolicyStyle.container}>
       <Commanhandler title="Privacy Policy" onBackPress={backPressHandler} />
      <ScrollView style={PrivacyPolicyStyle.scrollView}>
        <Text style={PrivacyPolicyStyle.content}>{privacyData?.data}</Text>
      </ScrollView>
    </View>
  );
};



export default PrivacyPolicy;