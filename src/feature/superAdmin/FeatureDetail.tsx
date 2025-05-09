import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigations';
import CommonHeader from '../../component/CommonHeader';
import DetailCard from '../../component/DetailCard'; // same as Bank screen

const FeatureDetail: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FeatureDetail'>>();
  const { feature} = route.params;

  const handleViewCommands = () => {
    navigation.navigate('CommandList', { fUuid: feature.uuid });
  };

  const handleSendSMS = () => {
    navigation.navigate('SendSMS1', { deviceUuid: feature.uuid });
  };

  const featureDetails = {
    description: feature.description,
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Feature Details" onBackPress={() => navigation.goBack()} />
      <DetailCard title={feature.name} data={featureDetails} />

     
      
    </View>
  );
};

export default FeatureDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  viewButton: {
    backgroundColor: '#f8b3b3',
    margin: 12,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  smsButton: {
    backgroundColor: '#FF6B6B',
    marginHorizontal: 12,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  smsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
