import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Sample user data
const user = {
  name: "Parminder Singh",
  email: "parminder@example.com",
  profilePic: "https://example.com/profile-pic.jpg", // Placeholder URL
};

const Profile = () => {
  const handleEditProfile = () => {
    // Logic to edit profile (e.g., navigate to EditProfile screen)
    alert("Edit Profile");
  };

  const handleLogout = () => {
    // Logic to log out the user (e.g., clear session, navigate to login screen)
    alert("Logged out");
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: user.profilePic }} style={styles.profilePic} />

      {/* User Information */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
