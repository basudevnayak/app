import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Newon = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Home</Text>
        <View style={styles.profileIcon}>
          <Icon name="person-circle" size={30} color="black" />
        </View>
      </View>

      <Image source={require('../assets/image.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileIcon: {
    padding: 5,
  },
  image: {
    width: 150, // Set an appropriate size for the image
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Newon;
