import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

// Sample data with profile picture URLs
const recipients = [
  { id: "1", name: "Pardeep Singh", accountEnding: "8051", country: "India", profilePic: "https://example.com/pardeep.jpg" },
  { id: "2", name: "Amrit Kaur", accountEnding: "2487", country: "Pakistan", profilePic: "https://example.com/amrit.jpg" },
  { id: "3", name: "Ravi Kumar", accountEnding: "5678", country: "Nepal", profilePic: "https://example.com/ravi.jpg" },
  { id: "4", name: "Simranjeet Singh", accountEnding: "3245", country: "India", profilePic: "https://example.com/simranjeet.jpg" },
  { id: "5", name: "Sandeep Dhillon", accountEnding: "1023", country: "UK", profilePic: "https://example.com/sandeep.jpg" },
];

const Recipients = () => {
  const renderItem = ({ item }) => (
    <View style={styles.recipientItem}>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.detailsContainer}>
        <Text style={styles.recipientName}>{item.name}</Text>
        <Text style={styles.recipientDetails}>Account ending in {item.accountEnding}</Text>
        <Text style={styles.recipientCountry}>Country: {item.country}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={recipients}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  recipientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recipientDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  recipientCountry: {
    fontSize: 12,
    color: "#888",
  },
});

export default Recipients;
