import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMoneyBillTrendUp,
  faGift,
  faUser,
  faPowerOff,
  faHistory,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const test = () => {
  Alert.alert("helolo", "vggvg");
};

const Home = ({ route }) => {
  const { sessionData } = route.params;
  const { email } = sessionData;

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{email}</Text>
      </View>

      {/* Currency Conversion Section */}
      <View style={styles.currencySection}>
        <Text style={styles.exchangeRateText}>OUR BEST RATE</Text>
        <View style={styles.currencyRow}>
          <Image
            source={{
              uri: "https://cdn3.iconfinder.com/data/icons/flag-world/512/flags-06-512.png",
            }}
            style={styles.flagIcon}
          />
          <Text style={styles.amountText}>1 GBP</Text>
          <Image
            source={{
              uri: "https://cdn.countryflags.com/thumbs/india/flag-400.png",
            }}
            style={styles.flagIcon}
          />
          <Text style={styles.amountText}>106.84 INR</Text>
        </View>
      </View>
      {/* Action Buttons Section */}
      <View style={styles.actionsContainer}>
        <ActionButton icon={faMoneyBillTrendUp} label="Transfer Money" />
        <ActionButton icon={faWallet} label="Wallet Recharge" />
        <ActionButton icon={faGift} label="Offers" />
      </View>

      {/* Offers Section */}
      <View style={styles.offerSection}>
        <View style={styles.offerCard}>
          <Text style={styles.offerText}>
            Get 10% Cashback on Your First Transfer
          </Text>
        </View>
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.recipientSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => test()}>
          <View style={styles.recipientCard}>
            <Image
              source={{
                uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
              }}
              style={styles.recipientFlag}
            />
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>Aiyesa Lusa</Text>
              <Text style={styles.transactionDetails}>
                Transaction No: 3035569163
              </Text>
              <Text style={styles.amountSent}>Sent Amount: 487 Euro</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.recipientCard}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
            }}
            style={styles.recipientFlag}
          />
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>Aiyesa Lusa</Text>
            <Text style={styles.transactionDetails}>
              Transaction No: 3035569163
            </Text>
            <Text style={styles.amountSent}>Sent Amount: 487 Euro</Text>
          </View>
        </View>
        <View style={styles.recipientCard}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
            }}
            style={styles.recipientFlag}
          />
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>Aiyesa Lusa</Text>
            <Text style={styles.transactionDetails}>
              Transaction No: 3035569163
            </Text>
            <Text style={styles.amountSent}>Sent Amount: 487 Euro</Text>
          </View>
        </View>
        <View style={styles.recipientCard}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
            }}
            style={styles.recipientFlag}
          />
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>Aiyesa Lusa</Text>
            <Text style={styles.transactionDetails}>
              Transaction No: 3035569163
            </Text>
            <Text style={styles.amountSent}>Sent Amount: 487 Euro</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable Action Button Component
const ActionButton = ({ icon, label }) => (
  <View style={styles.actionButton}>
    <FontAwesomeIcon icon={icon} size={20} color="#ffffff" />
    <Text style={styles.actionText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    paddingBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  currencySection: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
  },
  exchangeRateText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "bold",
  },
  currencyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginVertical: 10,
  },
  flagIcon: {
    width: 24,
    height: 24,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FF5C4F",
    borderRadius: 4,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "#ffffff",
    marginTop: 5,
    fontSize: 12,
  },
  recipientSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  recipientFlag: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  transactionDetails: {
    fontSize: 12,
    color: "#555",
  },
  amountSent: {
    fontSize: 14,
    color: "#FF5C4F",
  },
  offerSection: {
    marginBottom: 20,
  },
  offerCard: {
    backgroundColor: "#E0F7FA",
    padding: 15,
    borderRadius: 4,
    elevation: 0,
    alignItems: "center",
  },
  offerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00796B",
  },
});

export default Home;
