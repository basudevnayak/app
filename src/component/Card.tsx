import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Base } from "../data/models/Base";

interface BaseCardProps {
  item: Base;
  onPress: () => void;         // Updated
  onEdit: () => void;          // Updated
  onDelete: () => void;        // Updated
}

const Card: React.FC<BaseCardProps> = ({ item, onPress, onEdit, onDelete }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>UUID: {item.uuid || "N/A"}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={20} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default Card;
