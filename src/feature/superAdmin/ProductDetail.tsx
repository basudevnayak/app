import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import CommonHeader from "../../component/CommonHeader";
import { headerStyles } from "../../utils/theme";
import { RootStackParamList } from "../../navigation/Navigations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BASE_URL } from "../../utils/constants";

const ProductDetail: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ProductDetailScreen">>();
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetailScreen">>();
  const { product } = route.params;

  const imageUrl = product.image ? `${BASE_URL}/uploads/${product.image}` : null;

  const handleViewFeatures = () => {
    navigation.navigate("FeatureList", {
      productUuid: product.uuid,
      isDevice: false,
    });
  };

  return (
    <SafeAreaView style={headerStyles.mainContainer}>
      <CommonHeader title="Product Details" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={ProductDetailStyle.container}>
        <Text style={ProductDetailStyle.subHeaderText}>Product Information</Text>

        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={ProductDetailStyle.productImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={{ color: '#888', marginBottom: 12 }}>No image available</Text>
        )}

        <View style={ProductDetailStyle.infoBox}>
          <Text style={ProductDetailStyle.label}>Name:</Text>
          <Text style={ProductDetailStyle.value}>{product.name}</Text>
        </View>

        <View style={ProductDetailStyle.infoBox}>
          <Text style={ProductDetailStyle.label}>Model:</Text>
          <Text style={ProductDetailStyle.value}>{product.deviceModel}</Text>
        </View>

        <View style={ProductDetailStyle.infoBox}>
          <Text style={ProductDetailStyle.label}>Company:</Text>
          <Text style={ProductDetailStyle.value}>{product.company}</Text>
        </View>

        <View style={ProductDetailStyle.infoBox}>
          <Text style={ProductDetailStyle.label}>Description:</Text>
          <Text style={ProductDetailStyle.value}>{product.description}</Text>
        </View>

        <TouchableOpacity style={ProductDetailStyle.featureButton} onPress={handleViewFeatures}>
          <Text style={ProductDetailStyle.featureButtonText}>View Features</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

export const ProductDetailStyle = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "600",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#eee",
  },
  infoBox: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: "#333",
  },
  featureButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  featureButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
