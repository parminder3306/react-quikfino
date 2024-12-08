import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Custom styles
import Style from "../styles/Style";

const Icon = {
  SIcon: ({ icon, size, color }) => (
    <FontAwesomeIcon icon={icon} size={size} color={color} />
  ),

  ButtonIcon: ({ icon, size, color, style, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
    </TouchableOpacity>
  ),

  BigButtonIcon: ({ icon, size, color, navigateTo }) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        activeOpacity={0.8}
        style={Style.bigButtonContainer}
      >
        <View style={Style.bigButton}>
          <FontAwesomeIcon icon={icon} size={size} color={color} />
        </View>
      </TouchableOpacity>
    );
  },
};

export default Icon;
