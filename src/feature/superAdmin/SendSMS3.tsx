// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   FlatList,
// } from 'react-native';
// import {NativeModules} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import SmsAndroid from 'react-native-get-sms-android';
// import { colors } from '../../utils/theme';

// const Stack = createStackNavigator();
// const {SmsModule} = NativeModules;
// const SendSMS3 = ({route}: any) => {
//     const {mobileNumber} = route.params;
//     const formattedNumber = `+91${mobileNumber}`;
  
//     const [smsData, setSmsData] = useState<{timestamp: number; body: string}[]>(
//       [],
//     );
  
//     // Request SMS Read Permission for Android
//     const requestSMSReadPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_SMS,
//             {
//               title: 'SMS Read Permission',
//               message: 'This app needs permission to read messages.',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } catch (error) {
//           console.error('Permission Error:', error);
//           return false;
//         }
//       }
//       return true;
//     };
  
//     // Fetch SMS (Inbox & Sent) Filtered to Phone Number
//     const fetchSMS = async () => {
//       const hasPermission = await requestSMSReadPermission();
//       if (!hasPermission) {
//         Alert.alert('Permission Denied', 'Cannot read SMS without permission.');
//         return;
//       }
  
//       const filter = {
//         box: 'inbox',
//         maxCount: 10,
//         address: formattedNumber,
//       };
  
//       let allMessages: {timestamp: number; body: string; phone: string}[] = [];
  
//       SmsAndroid.list(
//         JSON.stringify(filter),
//         (fail: any) => {
//           Alert.alert('Failed with this error: ' + fail);
//         },
//         (count: any, smsList: any) => {
//           if (count > 0) {
//             const messages = JSON.parse(smsList);
//             allMessages = messages.map(
//               (msg: {body: string; date: string; service_center: string}) => ({
//                 timestamp: parseInt(msg.date), // Convert timestamp
//                 body: msg.body,
//                 phone: msg.service_center,
//               }),
//             );
  
//             // Sort messages by date (Newest first)
//             allMessages.sort((a, b) => b.timestamp - a.timestamp);
  
//             // Update state with formatted messages
//             setSmsData(allMessages);
//           } else {
//             setSmsData([]);
//           }
//         },
//       );
//     };
  
//     useEffect(() => {
//       fetchSMS();
//     }, []);
  
//     return (
//       <View style={thirdStyles.container}>
//         {smsData.length === 0 ? (
//           <Text style={thirdStyles.noMessages}>No messages found.</Text>
//         ) : (
//           <FlatList
//             data={smsData}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}) => (
//               <View style={thirdStyles.card}>
//                 <Text style={thirdStyles.messageText}>{item.body}</Text>
//                 <Text style={thirdStyles.timestamp}>
//                   {new Date(item.timestamp).toLocaleString()}
//                 </Text>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     );
//   };
  
//   // Styles
//   const thirdStyles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 15,
//       backgroundColor: '#f4f4f4',
//     },
//     noMessages: {
//       textAlign: 'center',
//       fontSize: 18,
//       marginTop: 20,
//     },
//     card: {
//       padding: 12,
//       marginVertical: 6,
//       borderRadius: 8,
//       elevation: 3,
//       shadowOpacity: 0.2,
//       shadowOffset: {width: 0, height: 2},
//       backgroundColor: '#FFF',
//     },
//     messageText: {
//       fontSize: 16,
//       color: '#333',
//     },
//     timestamp: {
//       fontSize: 12,
//       color: '#666',
//       marginTop: 5,
//       textAlign: 'right',
//     },
//   });
  
//   export default SendSMS3;