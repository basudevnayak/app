import React from 'react';  
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, RouteProp, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigations';
import CommonHeader from '../../component/CommonHeader';

const UserDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'UserDetail'>>(); 
  const { user } = route.params;

  const userDetails = [
    { label: 'Name', value: user.name },
    ...(user.signupType === 'email' ? [{ label: 'Email', value: user.email }] : []),
    ...(user.signupType === 'phone' ? [{ label: 'Phone', value: user.phone }] : []),
    { label: 'Role', value: user.role },
    { label: 'Signup Type', value: user.signupType },
  ];

  return (
    <View style={styles.container}>
      <CommonHeader
        title="User Details"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.cardContainer}>
        {userDetails.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardLabel}>{item.label}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default UserDetailsScreen;