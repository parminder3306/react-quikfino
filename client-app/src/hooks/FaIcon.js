import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Custom styles
import style from "../styles/Style";

const faIcon = {
  icon: ({ icon, size, color }) => (
    <FontAwesomeIcon icon={icon} size={size} color={color} />
  ),

  iconButton: ({ icon, size, color, style, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
    </TouchableOpacity>
  ),

  iconBigButton: ({ icon, size, color, label, navigateTo }) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        activeOpacity={0.8}
        style={style.bigButtonContainer}
      >
        <View style={style.bigButton}>
          <FontAwesomeIcon icon={icon} size={size} color={"#FFFFFF"} />
        </View>
        <Text style={[{ color: color }, style.bigButtonText]}>{label}</Text>
      </TouchableOpacity>
    );
  },
};

export default faIcon;
