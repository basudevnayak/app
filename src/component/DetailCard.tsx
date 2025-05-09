import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface EntityDetailCardProps {
  title: string;
  data: Record<string, string | number>;
}

const DetailCard: React.FC<EntityDetailCardProps> = ({ title, data }) => {
  return (
    <ScrollView contentContainerStyle={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {Object.entries(data).map(([label, value]) => (
        <View key={label} style={styles.item}>
          <Text style={styles.label}>{formatLabel(label)}:</Text>
          <Text style={styles.value}>{String(value)}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const formatLabel = (label: string): string => {
  // Converts camelCase or snake_case to Normal Label
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase());
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    margin: 12,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  item: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
});

export default DetailCard;
