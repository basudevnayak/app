import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { globalStyles } from "../utils/style";
import { TC_BackButton } from "../component/TC_BackButton";
import AddAppliancesScreen from "./AddAppliancesScreen";
import { Device } from "../data/models/Device";
import DeviceService from "../data/service/deviceService";
import BranchService from "../data/service/branchService";
import { PremiseProps } from "../navigation/Navigation";
import { Room } from "../data/models/Room";
import { TC_Header } from "../component/TC_Header";
import { TC_Text } from "../component/TC_Text";
import { Logger } from "../utils/logger";

export const Premise: React.FC<PremiseProps> = ({ navigation, route }) => {
  const [devices, setDevices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const bankId = route.params?.bankId;
  const phone = route.params?.phone;

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await BranchService.getAllBranchsByBankId(bankId);
        setBranches(data);
        if (data.length > 0) {
          setSelectedBranch(data[0]);
          fetchDevices(data[0].branchId);
        }
      } catch (error) {
        console.error("❌ Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [bankId]);

  const fetchDevices = async (branchId: string) => {
    try {
      setLoading(true);
      const data = await DeviceService.getAllDevicesByBranchId(branchId);
      Logger.log(data, branchId);
      setDevices(data);
    } catch (error) {
      Logger.error("❌ Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    fetchDevices(branch.branchId);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#000"
        style={globalStyles.labelIcon}
      />
    );
  }

  return (
    <>
      <TC_Header
        navigation={navigation}
        phone={phone}
        bankId={bankId}
        branches={branches}
        selectedBranch={selectedBranch}
        onSelectBranch={handleBranchSelect}
      />
      <View style={globalStyles.column}>
        {/* All Devices */}

        <FlatList
          data={devices}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PremiseName", {deviceData: item})}
              >
                <Text style={globalStyles.normalText}>{item.deviceName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Add Sevice Button */}

        <View style={globalStyles.mediumHeight} />

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            navigation.navigate("AddAppliance", { branchId: selectedBranch.branchId });
          }}
        >
          <Text style={globalStyles.buttonText}>Add Device</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

