import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigations';
import { fetchTermsAndConditions } from '../../data/service/T&CApiService';
import { showAlert } from '../../utils/alert/Alert';
import { TermsAndCondition } from '../../utils/styles';
import { Logger } from '../../utils/logger';
import Commanhandler from '../../component/CommonHeader'; // Adjusted the path to the correct location
type TermsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TermsAndConditions = () => {
  const navigation = useNavigation<TermsScreenNavigationProp>();
  const [terms, setTerms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTerms = async () => {
    try {
      Logger.log('Starting to load terms and conditions...');
      const response = await fetchTermsAndConditions();
      Logger.log('Received terms and conditions:', response);

      if (!response || !Array.isArray(response.content)) {
        Logger.error('Invalid response structure:', response);
        throw new Error('Invalid response structure from server');
      }

      if (response.status === 'success') {
        setTerms(response.content);
        setError(null);
      } else {
        throw new Error(response.message || 'Failed to load terms and conditions');
      }
    } catch (err) {
      Logger.error('Error in TermsAndConditions component:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load terms and conditions. Please try again later.';
      setError(errorMessage);
      showAlert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTerms();
  }, []);

  const backPressHandler = () => navigation.goBack(); // updated to goBack

  return (
    <View style={TermsAndCondition.container}>
      <Commanhandler title="Terms and Conditions" onBackPress={backPressHandler} showBackButton={true}/>

      {loading ? (
        <View style={TermsAndCondition.loadingContainer}>
          <ActivityIndicator size="large" color="#4b2ed2" />
          <Text style={TermsAndCondition.loadingText}>Loading terms and conditions...</Text>
        </View>
      ) : error ? (
        <View style={TermsAndCondition.errorContainer}>
          <Text style={TermsAndCondition.errorText}>{error}</Text>
          <TouchableOpacity
            style={TermsAndCondition.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
              loadTerms();
            }}
          >
            <Text style={TermsAndCondition.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : terms.length === 0 ? (
        <View style={TermsAndCondition.emptyContainer}>
          <Text style={TermsAndCondition.emptyText}>No terms and conditions available.</Text>
        </View>
      ) : (
        <ScrollView style={TermsAndCondition.scrollView}>
          {terms.map((section, index) => (
            <View key={index} style={TermsAndCondition.section}>
              <Text style={TermsAndCondition.content}>{section}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TermsAndConditions;
