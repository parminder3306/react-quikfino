import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const Send = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currency, setCurrency] = useState("GBP");

  const handleSend = () => {
    if (amount && recipient) {
      // Logic for sending money (e.g., API call, validation, etc.)
      alert(`Sending ${amount} ${currency} to ${recipient}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Amount Input */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      {/* Recipient Input */}
      <Text style={styles.label}>Recipient</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipient name"
        value={recipient}
        onChangeText={setRecipient}
      />

      {/* Currency Dropdown */}
      <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
        value={currency}
        editable={false} // Set as non-editable since it's a fixed value
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: "#FF5C4F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Send;
