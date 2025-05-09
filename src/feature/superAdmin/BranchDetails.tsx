import {
  View,
  StyleSheet,
  
} from "react-native";
import { useNavigation, useRoute, RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigations";
import CommonHeader from "../../component/CommonHeader";
import DetailCard from "../../component/DetailCard";
const BranchListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BranchDetails'>>();
  const { branch } = route.params;
   const branchDetails = {
    branchCode: branch.code,
    postalAddress: branch.postalAddress,
    city: branch.city,
    state: branch.state,
    pinCode: branch.pinCode,
    phone: branch.phone, 
  };
  return (
    <View style={styles.container}>
      <CommonHeader title="Branch  Details" onBackPress={() => navigation.goBack()} />
      <DetailCard title={branch.name} data={branchDetails} />
      </View>
  );
};
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




export default BranchListScreen;
