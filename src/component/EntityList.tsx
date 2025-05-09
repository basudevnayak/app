import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CommonHeader from './CommonHeader';
import List from './List';
import { showAlert } from '../utils/alert/Alert';

interface CommonEntityListProps<T> {
  title: string;
  fetchData: () => Promise<T[]>;
  deleteData: (uuid: string) => Promise<void>;
  onAddNavigate: string;
  renderCard: (
    item: T,
    onPress: (item: T) => void,
    onEdit: (item: T) => void,
    onDelete: (uuid: string) => void
  ) => JSX.Element;
  refreshParamKey?: string;
}

function EntityList<T extends { uuid?: string; name: string }>(
  {
    title,
    fetchData,
    deleteData,
    onAddNavigate,
    renderCard,
    refreshParamKey = 'refresh',
  }: CommonEntityListProps<T>
) {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const isFocused = useIsFocused();

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchData();
      setData(res || []);
    } catch (err) {
      console.error(`Failed to fetch ${title}`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused || route.params?.[refreshParamKey]) {
      loadData();
    }
  }, [isFocused, route.params?.[refreshParamKey]]);

  const handleAdd = () => {
    navigation.navigate(onAddNavigate, {
      onAdded: async () => await loadData(),
    });
  };

  const handleDelete = async (uuid: string | undefined) => {
    if (!uuid) return;
    try {
      await deleteData(uuid);
      setData(prev => prev.filter(p => p.uuid !== uuid));
      showAlert('Deleted', `${title} deleted successfully`);
    } catch (err) {
      showAlert('Error', `Failed to delete ${title}`);
      console.error(`Delete error for ${title}:`, err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CommonHeader
        title={`${title} List`}
        onBackPress={() => navigation.goBack()}
        onRightPress={handleAdd}
        showRightIcon={true}
        rightIconName="add-circle-outline"
      />

      <List
        data={data}
        loading={loading}
        keyExtractor={(item) => item.uuid || item.name}
        renderItem={({ item }) =>
          renderCard(
            item,
            (item) => {}, // Will be overridden in actual screen
            (item) => {},
            (uuid) => handleDelete(uuid)
          )
        }
        ListEmptyComponentText={`No ${title.toLowerCase()}s found`}
      />
    </View>
  );
}

export default EntityList;
