import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigations';
import { UserList } from '../../utils/styles';
import { TC_Text } from '../../component/TC_Text';
import { transformCountsToCategories } from '../../data/helper/UserRoleCountHelper';
import CommonHeader from '../../component/CommonHeader';

type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;

interface UserCategory {
  type: string;
  count: number;
  value:string
}

const UserListScreen = () => {
  const navigation = useNavigation<UserListScreenNavigationProp>();
  const [userCategories, setUserCategories] = useState<UserCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddUser = () => {
    navigation.navigate('AddUser');
  };

  const navigateToUserList = (role: string) => {
    navigation.navigate('UserListDetails', { role });
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await userService.customGet<any>(`role/count`);
        console.log("Response",response);
        const categories = transformCountsToCategories(response.data);
        console.log("Categories",categories);
        setUserCategories(categories);
      } catch (error) {
        console.error('Failed to fetch user counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CommonHeader
        title="Users"
        onBackPress={() => navigation.goBack()}
        rightIconName="add-circle-outline"
        onRightPress={handleAddUser}
      />

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#007bff"
            style={{ marginTop: 50 }}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={UserList.categoryContainer}>
              {userCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[UserList.categoryCard, { backgroundColor: '#FF7F7F' }]}
                  onPress={() => navigateToUserList(category.value)}
                >
                  <TC_Text label={category.type} style={UserList.categoryType} />
                  <TC_Text
                    label={`${category.count}`}
                    style={UserList.categoryCount}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export const CardStyle  = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  text: { fontSize: 14, color: "#555", marginTop: 4 },
  meta: { fontSize: 12, color: "#888", marginTop: 4, fontStyle: "italic" },
  actions: { flexDirection: "row", marginLeft: 12 },
  icon: { marginHorizontal: 6 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noDataText: { fontSize: 16, color: "#777" },
});

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};


export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
};

import { FlexAlignType, ViewStyle } from "react-native";
import { userService } from '../../data/service/ApiServiceFactory';

export const alignment = {
  center: {
    justifyContent: "center" as ViewStyle["justifyContent"],
    alignItems: "center" as FlexAlignType,
  },
  flexStart: {
    justifyContent: "flex-start" as ViewStyle["justifyContent"],
    alignItems: "flex-start" as FlexAlignType,
  },
  flexEnd: {
    justifyContent: "flex-end" as ViewStyle["justifyContent"],
    alignItems: "flex-end" as FlexAlignType,
  },
  spaceBetween: {
    justifyContent: "space-between" as ViewStyle["justifyContent"],
    alignItems: "center" as FlexAlignType,
  },
  row: {
    flexDirection: "row" as ViewStyle["flexDirection"],
    alignItems: "center" as FlexAlignType,
  },
  column: {
    flexDirection: "column" as ViewStyle["flexDirection"],
    alignItems: "center" as FlexAlignType,
  },
};

export const headerStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightSpace: {
    width: 40, // Match backButton width to keep title centered
  },
});


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});

export default UserListScreen;
