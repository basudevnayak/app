import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView, AnimatePresence } from 'moti';
//import { branchesData } from './data/branches';

interface Branch {
  city: string;
  ifsc: string;
}

interface BankDetail {
  name: string;
  address: string;
  ifsc: string;
}

const bankDetail: BankDetail = {
  name: 'Canara Bank',
  address: '5th Floor Naveen Complex,\n14 Mg Rd Bangalore Complex,\nKarnataka 560001',
  ifsc: 'CNRB00037453',
};

const BranchListScreen: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const navigation = useNavigation();

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    ToastAndroid.show(`${branch.city} selected`, ToastAndroid.SHORT);
  };

  const renderBranchItem = ({ item }: { item: Branch }) => (
    <TouchableOpacity onPress={() => handleSelectBranch(item)}>
      <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
        <Text style={{ fontWeight: 'bold' }}>{item.city}</Text>
        <Text style={{ fontSize: 12 }}>{item.ifsc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Branch</Text>

      <AnimatePresence>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -20 }}
          transition={{ type: 'timing', duration: 500 }}
          style={{ backgroundColor: '#f28b82', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>{bankDetail.name}</Text>
          <Text>{bankDetail.address}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 8 }}>Ifsc Code: {bankDetail.ifsc}</Text>
        </MotiView>
      </AnimatePresence>

      <FlatList
        data={branchesData}
        keyExtractor={(item) => item.ifsc + item.city}
        renderItem={renderBranchItem}
      />
    </View>
  );
};

export default BranchListScreen;
