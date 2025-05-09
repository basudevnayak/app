import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnimatePresence, MotiView } from 'moti';
import { BankList } from '../../utils/styles';

interface Bank {
  name: string;
  address: string;
  code: string;
}

const BankListScreen: React.FC = () => {
  const banksData: Bank[] = [
    { name: 'Bank A', address: '123 Main St', code: 'BA001' },
    { name: 'Bank B', address: '456 Oak Ave', code: 'BB002' },
    { name: 'Bank C', address: '789 Pine Rd', code: 'BC003' },
  ];
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const navigation = useNavigation();

  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
    ToastAndroid.show(`${bank.name} selected`, ToastAndroid.SHORT);
  };

  const renderBankItem = ({ item }: { item: Bank }) => (
    <TouchableOpacity onPress={() => handleSelectBank(item)}>
      <View style={BankList.bankItem}>
        <Text style={BankList.bankName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={BankList.container}>
      {/* Header with back button */}
      <View style={BankList.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={BankList.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={BankList.headerTitle}>Banks</Text>
        {/* Empty view as a placeholder for center alignment */}
        <View style={{ width: 50 }} />
      </View>

      <AnimatePresence>
        {selectedBank && (
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ type: 'timing', duration: 500 }}
            style={[BankList.selectedBankContainer, { backgroundColor: '#f8b3b3' }]}>
            <Text style={BankList.selectedBankName}>{selectedBank.name}</Text>
            <Text>{selectedBank.address}</Text>
            <Text style={BankList.selectedBankCode}>Bank Code: {selectedBank.code}</Text>
          </MotiView>
        )}
      </AnimatePresence>

      <FlatList
        data={banksData}
        keyExtractor={(item) => item.code}
        renderItem={renderBankItem}
      />
    </View>
  );
};



export default BankListScreen;
