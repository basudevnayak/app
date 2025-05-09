import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showAlert } from '../utils/alert/Alert';

interface SystemIntegrator {
  id: string;
  integratorCode: string;
  integratorName: string;
  status: string;
  role: string;
}

const SystemIntegratorScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [integrators, setIntegrators] = useState<SystemIntegrator[]>([
    { id: '1', integratorCode: 'DEVICE 1', integratorName: 'YHF8599G', status: 'Active', role: 'Admin' },
    { id: '2', integratorCode: 'DEVICE 2', integratorName: 'YHF8509G', status: 'Active', role: 'Super' },
  ]);

  const handleDelete = (id: string) => {
   showAlert('Delete', 'Are you sure you want to delete this integrator?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setIntegrators(integrators.filter(integrator => integrator.id !== id)) },
    ]);
  };

  const filteredIntegrators = integrators.filter(integrator =>
    integrator.integratorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>

      <Text style={styles.header}>System Integrator Management</Text>

      {/* Add System Integrator Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddSystemIntegrator' as never)}>
        <Text style={styles.addButtonText}>Add System Integrator +</Text>
      </TouchableOpacity>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search System Integrator"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* System Integrator List */}
      <FlatList
        data={filteredIntegrators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.integratorItem}>
            <Text>{item.integratorCode}</Text>
            <Text>{item.integratorName}</Text>
            <Text>{item.status}</Text>
            <Text>{item.role}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditDeleteDevice' as never)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  addButton: { backgroundColor: 'pink', padding: 10, borderRadius: 10, alignSelf: 'flex-end' },
  addButtonText: { fontSize: 16 },
  searchInput: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  integratorItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  editText: { color: 'blue' },
  deleteText: { color: 'red' },
});

export default SystemIntegratorScreen;