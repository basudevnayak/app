import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  FlatListProps,
} from 'react-native';

interface CommonFlatListProps<T> {
  data: T[];
  loading?: boolean;
  keyExtractor: (item: T, index: number) => string;
  renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
  ListEmptyComponentText?: string;
  contentContainerStyle?: ViewStyle;
  ListHeaderComponent?: React.ReactElement | null;
  ListFooterComponent?: React.ReactElement | null;
}

function List<T>({
  data,
  loading = false,
  keyExtractor,
  renderItem,
  ListEmptyComponentText = 'No data found',
  contentContainerStyle = {},
  ListHeaderComponent,
  ListFooterComponent,
}: CommonFlatListProps<T>): JSX.Element {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={[
        styles.container,
        data.length === 0 && styles.centered,
        contentContainerStyle,
      ]}
      ListEmptyComponent={
        <Text style={styles.emptyText}>{ListEmptyComponentText}</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default List;
