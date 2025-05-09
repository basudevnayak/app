import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { apiService } from '../../data/service/api';
import { Item, ItemListResponse } from '../../data/models/ItemModel';
import { ItemListStyle } from '../../utils/styles';

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await apiService.getData<ItemListResponse>('/items');
      setItems(response.data.items);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Please try again later.');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={ItemListStyle.itemContainer}>
      <Text style={ItemListStyle.itemTitle}>{item.title}</Text>
      <Text style={ItemListStyle.itemDescription}>{item.description}</Text>
      <Text style={ItemListStyle.itemDate}>
        Created: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={ItemListStyle.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={ItemListStyle.centerContainer}>
        <Text style={ItemListStyle.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={ItemListStyle.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};



export default ItemList; 