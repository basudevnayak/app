import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { AllHomeProps } from "../navigation/Navigation";
import { globalStyles } from "../utils/style";
import { TC_Text } from "../component/TC_Text";
import { TC_BackButton } from "../component/TC_BackButton";
import { Bank } from "../data/models/Premise";
import BankService from "../data/service/bankService";

const AllHomeScreen: React.FC<AllHomeProps> = ({ navigation, route }) => {
  const [premises, setPremises] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const { phone } = route.params;

  useEffect(() => {
    const fetchPremises = async () => {
      try {
        const data = await BankService.getBankByPhone(phone);
        setPremises(data);
      } catch (error) {
        console.error("❌ Error fetching premises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremises();
  }, []);

  return (
    <View style={globalStyles.column}>
      <TC_BackButton />
      <TC_Text style={globalStyles.h1Text} label="Your Banks" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : premises.length > 0 ? (
        <FlatList
          data={premises}
          keyExtractor={(item) => item.bankId || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={globalStyles.card}>
              <Text
                onPress={() =>
                  navigation.navigate("Premise", {
                    phone: phone,
                    bankId: item.bankId,
                  })
                }
                style={globalStyles.normalText}
              >
                {item.bankName ? item.bankName : "Unnamed Bank"}
              </Text>

              <TC_Text
                style={globalStyles.normalText}
                label={item.address ? item.address : "No Address Available"}
              />
            </View>
          )}
        />
      ) : (
        <TC_Text style={globalStyles.normalText} label="No Banks found." />
      )}

    </View>
  );
};

export default AllHomeScreen;
