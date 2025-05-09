import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Bank } from '../../data/models/Bank';
import Card from '../../component/Card';
import EntityList from '../../component/EntityList';
import { bankService } from '../../data/service/ApiServiceFactory';
import AsyncStorageHelper from '../../utils/data/local/AsyncStorageHelper';
import { KEYS } from '../../utils/constants';

const BankList = () => {
  const navigation = useNavigation<any>();

  const fetchBanks = async () => {
    try {
      
      const response = await bankService.getAll();
      return Array.isArray(response.data) ? response.data : (response as { data: Bank[] }).data || [];
    } catch (error) {
      console.error('Failed to fetch banks:', error);
      return [];
    }
  };

  const deleteBank = async (uuid: string) => {
    try {
     
      await bankService.delete(uuid);
    } catch (error) {
      console.error('Failed to delete bank:', error);
      throw error;
    }
  };

  const handleView = async (item: Bank) => {
    await AsyncStorageHelper.setItem<Bank>(KEYS.SELECTED_BANK,item)
    navigation.navigate('BankDetails', { bank: item });
  };

  const handleEdit = (item: Bank) => {
    navigation.navigate('EditBank', { 
      bank: item,
      onUpdated: () => {
        // This will trigger a refresh when we return to the list
        navigation.setParams({ refresh: true });
      }
    });
  };

  return (
    <EntityList<Bank>
      title="Bank"
      fetchData={fetchBanks}
      deleteData={deleteBank}
      onAddNavigate="AddBank"
      renderCard={(item, _, onEdit, onDelete) => (
        <Card
          item={item}
          onPress={() => handleView(item)}
          onEdit={() => handleEdit(item)}
          onDelete={() => onDelete(item.uuid!)}
        />
      )}
    />
  );
};

export default BankList;
