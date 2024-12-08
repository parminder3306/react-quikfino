import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faQrcode,
  faMobileAlt,
  faMoneyCheckAlt,
  faUniversity,
  faMobile,
  faTv,
  faBolt,
  faBurn,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const handleRecharge = () => {
    Alert.alert("Recharge Alert", "Recharge process initiated!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/400x100?text=Get+up+to+5+Lakh+Loan",
          }}
          style={styles.bannerImage}
        />
      </View>

      {/* Money Transfer Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Money Transfer</Text>
        <View style={styles.moneyTransferRow}>
          <ActionButton icon={faQrcode} label="Scan QR" />
          <ActionButton icon={faMobileAlt} label="UPI ID/Mobile" />
          <ActionButton icon={faMoneyCheckAlt} label="Check Balance" />
          <ActionButton icon={faUniversity} label="To Bank/Self" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Pay to Contacts, Phone No. or UPI ID"
        />
      </View>

      {/* Recharge Alert Section */}
      <TouchableOpacity onPress={handleRecharge} style={styles.alertBox}>
        <Text style={styles.alertText}>
          Mobile Plan expires in 10 days - Recharge Now!
        </Text>
        <Text style={styles.rechargeAmount}>₹750</Text>
      </TouchableOpacity>

      {/* Recharges & Bill Payments */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recharges & Bill Payments</Text>
        <View style={styles.moneyTransferRow}>
          <ActionButton icon={faMobile} label="Mobile" />
          <ActionButton icon={faTv} label="DTH" />
          <ActionButton icon={faBolt} label="Electricity" />
          <ActionButton icon={faBurn} label="Gas" />
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable Action Button Component
const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionButton}>
    <FontAwesomeIcon icon={icon} size={20} color="#FF6E40" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF6E40",
    padding: 15,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  bannerContainer: {
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moneyTransferRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    flex: 1,
    margin: 5,
  },
  actionLabel: {
    marginTop: 8,
    color: "#222",
    fontSize: 12,
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  alertBox: {
    margin: 10,
    padding: 15,
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: "#FF6E40",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertText: {
    fontSize: 14,
    color: "#FF6E40",
  },
  rechargeAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6E40",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: "#AAAAAA",
  },
});

export default Home;
