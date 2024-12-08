import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Custom styles
import Style from "../styles/Style";

const Icon = ({ icon, size, color }) => (
  <FontAwesomeIcon icon={icon} size={size} color={color} />
);

const ButtonIcon = ({ icon, size, color, style, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
  </TouchableOpacity>
);

const BigButtonIcon = ({ icon, size, color, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo)}
      activeOpacity={0.8}
    >
      <View style={Style.bigButtonContainer}>
        <View style={Style.bigButton}>
          <FontAwesomeIcon icon={icon} size={size} color={color} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { Icon, ButtonIcon, BigButtonIcon };
