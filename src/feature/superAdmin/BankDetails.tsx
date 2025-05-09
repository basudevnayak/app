import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigations';
import CommonHeader from '../../component/CommonHeader';
import DetailCard from '../../component/DetailCard'; // path may vary

const BankDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BankDetails'>>();
  const { bank } = route.params;

  const handleViewBranches = () => {
    navigation.navigate('BranchList', { bankUuid: bank.uuid });
  };

  const bankDetails = {
    code: bank.code,
    postalAddress: bank.postalAddress,
    city: bank.city,
    state: bank.state,
    pinCode: bank.pinCode,
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Bank Details" onBackPress={() => navigation.goBack()} />
      <DetailCard title={bank.name} data={bankDetails} />
      <TouchableOpacity style={styles.featureButton} onPress={handleViewBranches}>
        <Text style={styles.featureText}>View Branches</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  featureButton: {
    backgroundColor: '#f8b3b3',
    margin: 12,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  featureText: {
    color: '#000',
    fontWeight: '600',
  },
});
