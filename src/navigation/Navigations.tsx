import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import BankListScreen from "../feature/superAdmin/BankList";

import UserListScreen from "../feature/superAdmin/UserList";
import EditUserScreen from "../feature/superAdmin/EditUser";
import RequestListScreen from "../feature/systemIntegrator/RequestList";
import UserDashboardScreen from "../feature/user/UserDashboard";
import AddBranchScreen from "../feature/superAdmin/AddBranch";
import BranchDetailsScreen from "../feature/superAdmin/BranchDetails";
import DashboardSystemIntegratorScreen from "../feature/systemIntegrator/DashboardSystemIntegrator";
import LoginOptionsScreen from "../feature/common/LoginOptions";
import SignUpScreen from "../feature/superAdmin/SignUp";
import ForgotPassword from "../feature/superAdmin/ForgotPassword";
import ConfirmPassword from "../feature/superAdmin/ConfirmPassword";
import PrivacyPolicy from "../feature/common/PrivacyPolicy";
import TermsAndConditions from "../feature/common/TermsAndConditions";
import Notifications from "../feature/superAdmin/Notifications";
import SettingScreen from "../feature/superAdmin/SettingsScreen";
import FeatureDetail from "../feature/superAdmin/FeatureDetail";
import FeatureListScreen from "../feature/superAdmin/FeatureList";
import ProductDetail from "../feature/superAdmin/ProductDetail";
import ProductList from "../feature/superAdmin/ProductList";
import UserDetailsScreen from "../feature/superAdmin/UserDetailScreen";
import UserListDetails from "../feature/superAdmin/UserListDetails";
import { User } from "../data/models/User";
import EnterOTP from "../feature/common/EnterOTP";
import EnterPhone from "../feature/common/EnterPhone";
import ProfileUpdate from "../feature/common/ProfileUpdate";
import AddBank from "../feature/superAdmin/AddBank";
import AddCommand from "../feature/superAdmin/AddCommand";
import AddDevice from "../feature/superAdmin/AddDevice";
import BranchList from "../feature/superAdmin/BranchList";
import AddProduct from "../feature/superAdmin/AddProduct";
import AddUser from "../feature/superAdmin/AddUser";
import BankDetails from "../feature/superAdmin/BankDetails";
import Dashboard from "../feature/superAdmin/Dashboard";
import DeviceList from "../feature/superAdmin/DeviceList";
import EditBank from "../feature/superAdmin/EditBank";
import EditDevice from "../feature/superAdmin/EditDevice";
import EditFeature from "../feature/superAdmin/EditFeature";
import EditProduct from "../feature/superAdmin/EditProduct";
import AddFeature from "../feature/superAdmin/AddFeature";
import SplashScreen from "../feature/common/SplashScreen";
import { Product } from "../data/models/Product";
import { Device } from "../data/models/Device";
import DeviceDetail from "../feature/superAdmin/DeviceDetails";
import AddBranch from "../feature/superAdmin/AddBranch";
import { Feature } from "../data/models/Feature";
import { Bank } from "../data/models/Bank";
import { Branch } from "../data/models/Branch";
import EditBranch from "../feature/superAdmin/EditBranch";
import SendSMS1 from "../feature/superAdmin/SendSMS1";
import SendSMS2 from "../feature/superAdmin/SendSMS2";






export type RootStackParamList = {
  Dashboard: undefined;
  BankList: {bank: Bank};
  SplashScreen: undefined;
  EnterPhone: undefined;
  EnterOTP: { emailorphone: string };
  Login: undefined;
  AddBank: undefined;
  UpdateDevice: { deviceId: string };
  DeviceList: { refresh: boolean };
  UserList: undefined;
  AddUser: undefined;
  EditBank: { bank: Bank };
   EditBranch: {branch: Branch};
  EditUser: { user: User };
  BankDetails: { bank: Bank };
  BranchList: { bankUuid: string; newBranch?: { name: string; city: string; _id: string } };
  AddBranch: { bankId: string };
  BranchDetails: { branch: Branch };
  LoginOptions: undefined;
  SignUp: { identifier?: string, userData?: any }; 
  ForgotPassword: { identifier?: string, fromProfileUpdate: boolean };
 
  ConfirmPassword: { emailOrPhone: string; userData: any };
  RequestList: undefined;
  DashboardSystemIntegrator: undefined;
  UserDashboard: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  AddDevice: undefined;
  EditDevice: undefined;
  DeviceDetail: {device: Device};
  ProfileUpdate: undefined;
  NotificationsScreen: undefined;
  Setting: undefined;
  NotificationList:undefined;
  ProductList: { refresh: boolean }; 
 AddCommand:{fUuid:string};
 EditCommandScreen: { command: any }; 
  ProductDetailScreen: { product: Product };
  EditProductScreen: { product: Product};
  AddProductScreen:  { onProductAdded: () => void } ;
  FeatureList: {  refresh?:boolean,productUuid?:string,isDevice?:boolean,device:Device };
  CommandList: { fUuid: string };
  AddFeature: { dUuid: string }; 
  EditFeature: { feature: Feature;fUuid:string };
  FeatureDetail: { feature: Feature };
  UserDetail: { user: User };
  UserListDetails: { role: string };
  SendSMS1: { feature: Feature,phoneNumber:string };
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="EnterPhone" component={EnterPhone} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
  
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="BankList" component={BankListScreen} />
      <Stack.Screen name="AddBank" component={AddBank} />
      <Stack.Screen name="EditBank" component={EditBank} />
      <Stack.Screen name="EditBranch" component={EditBranch}/>
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="BranchList" component={BranchList} />
      <Stack.Screen name="AddBranch" component={AddBranch} />
      <Stack.Screen name="BranchDetails" component={BranchDetailsScreen} />
      <Stack.Screen name="AddDevice" component={AddDevice} />
      <Stack.Screen name="DeviceList" component={DeviceList} />
      <Stack.Screen name="DeviceDetail" component={DeviceDetail}/>
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="EditUser" component={EditUserScreen} />
      <Stack.Screen name="LoginOptions" component={LoginOptionsScreen} />
      <Stack.Screen name="RequestList" component={RequestListScreen} />
      <Stack.Screen name="DashboardSystemIntegrator" component={DashboardSystemIntegratorScreen} />
      <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="EditDevice" component={EditDevice} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      <Stack.Screen name="Setting" component={SettingScreen} />       
      <Stack.Screen name="ProductList" component={ProductList} />  
      <Stack.Screen name="NotificationsScreen" component={Notifications}/>
      <Stack.Screen name="AddCommand" component={AddCommand} />
      <Stack.Screen name="FeatureList" component={FeatureListScreen} />
      <Stack.Screen name="FeatureDetail" component={FeatureDetail} />
      <Stack.Screen name="AddFeature" component = {AddFeature} />
      <Stack.Screen name="EditFeature" component={EditFeature} />
      <Stack.Screen name="AddProductScreen" component={AddProduct} />
      <Stack.Screen name="EditProductScreen" component={EditProduct} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetail} />
      <Stack.Screen name="UserDetail" component={UserDetailsScreen} />
      <Stack.Screen name="UserListDetails" component={UserListDetails} />
      <Stack.Screen name="SendSMS1" component={SendSMS1} />
    </Stack.Navigator>
  );
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export {
  Navigation,
};
