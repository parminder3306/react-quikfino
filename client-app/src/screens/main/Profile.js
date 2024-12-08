import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

const Profile = () => {
  const [balance, setBalance] = useState(20.0); // Initial balance
  const [rechargeAmount, setRechargeAmount] = useState(""); // Custom recharge input
  const [history, setHistory] = useState([
    { id: "1", type: "Top-up", amount: 10, date: "2024-11-30" },
    { id: "2", type: "Journey", amount: -2.5, date: "2024-11-29" },
  ]);

  // Function to handle recharge
  const handleRecharge = (amount) => {
    if (amount <= 0 || isNaN(amount)) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }
    setBalance((prev) => prev + parseFloat(amount)); // Update balance
    setHistory((prev) => [
      { id: Date.now().toString(), type: "Top-up", amount: parseFloat(amount), date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
    setRechargeAmount("");
    Alert.alert("Success", `£${amount} added to your Oyster card.`);
  };

  return (
    <View style={styles.container}>
      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Current Balance</Text>
        <Text style={styles.balanceAmount}>£{balance.toFixed(2)}</Text>
      </View>

      {/* Recharge Options */}
      <View style={styles.rechargeContainer}>
        <Text style={styles.rechargeTitle}>Recharge Your Oyster Card</Text>
        <View style={styles.quickRecharge}>
          {[5, 10, 20, 50].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={styles.quickRechargeButton}
              onPress={() => handleRecharge(amount)}
            >
              <Text style={styles.quickRechargeText}>£{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter custom amount"
          value={rechargeAmount}
          onChangeText={setRechargeAmount}
        />
        <TouchableOpacity
          style={styles.rechargeButton}
          onPress={() => handleRecharge(rechargeAmount)}
        >
          <Text style={styles.rechargeButtonText}>Recharge Now</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyType}>{item.type}</Text>
              <Text style={styles.historyAmount}>
                {item.amount > 0 ? `+£${item.amount}` : `-£${Math.abs(item.amount)}`}
              </Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  balanceContainer: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rechargeContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  rechargeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  quickRecharge: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quickRechargeButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    borderRadius: 8,
    width: "22%",
    alignItems: "center",
  },
  quickRechargeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  rechargeButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  rechargeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  historyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  historyType: {
    fontSize: 16,
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyDate: {
    fontSize: 14,
    color: "#777777",
  },
});

export default Profile;
