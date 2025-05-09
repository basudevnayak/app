import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigations';
import CommonHeader from '../../component/CommonHeader';
import DetailCard from '../../component/DetailCard'; // your existing component
import { ProductDetailStyle } from './ProductDetail';

const DeviceDetail: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'DeviceDetail'>>();
  const { device } = route.params;

  const handleViewFeatures = () => {
    navigation.navigate("FeatureList", {
      productUuid: device.productUuid,
      device:device,
      isDevice: true,
    });
  };

  const deviceDetails = {
    Bank: device.bankUuid,          // assuming bank name not fetched yet
    Branch: device.branchUuid,      // assuming branch name not fetched yet
    Product: device.productUuid,    // assuming product name not fetched yet
    SIMNumber: device.simNumber,
    Description: device.description,
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Device Details" onBackPress={() => navigation.goBack()} />
      <DetailCard title="Device Information" data={deviceDetails} />
              <TouchableOpacity style={ProductDetailStyle.featureButton} onPress={handleViewFeatures}>
                <Text style={ProductDetailStyle.featureButtonText}>View Features</Text>
              </TouchableOpacity>
           
    </View>
  );
};

export default DeviceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  smsButton: {
    backgroundColor: '#f76c6c',
    margin: 12,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  smsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
