import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RequestList } from '../../utils/styles';

interface RequestItem {
  id: string;
  bank: string;
  branch: string;
  pinCode: string;
  status: string;
  phoneNo: string;
}

const RequestListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<RequestItem[]>([
    { id: '1', bank: 'Canara Bank', branch: 'Rohini', pinCode: '4783947', status: 'Accept', phoneNo: '6399989456' },
    { id: '2', bank: 'Canara Bank', branch: 'Rohini', pinCode: '4783947', status: 'Accept', phoneNo: '6399989456' },
    { id: '3', bank: 'Canara Bank', branch: 'Rohini', pinCode: '4783947', status: 'Accept', phoneNo: '6399989456' },
  ]);

  const filteredRequests = requests.filter(request =>
    request.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={RequestList.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={RequestList.backButton}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>

      <Text style={RequestList.header}>Request list</Text>

      {/* Search Input */}
      <TextInput
        style={RequestList.searchInput}
        placeholder="Search Request"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Request List */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={RequestList.requestItem}>
            <Text>Bank: {item.bank}</Text>
            <Text>Branch: {item.branch}</Text>
            <Text>Pin Code: {item.pinCode}</Text>
            <Text>Accept/Reject: {item.status}</Text>
            <Text>Phone NO: {item.phoneNo}</Text>
          </View>
        )}
      />
    </View>
  );
};



export default RequestListScreen;
