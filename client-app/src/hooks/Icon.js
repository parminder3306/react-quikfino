import React from "react";
import { TouchableOpacity, View } from "react-native";
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

const BigButtonIcon = ({ icon, size, color, style, onPress }) => (
  <TouchableOpacity
    style={Style.bigButtonContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={Style.bigButton}>
      <FontAwesomeIcon icon={icon} size={size} color={color} style={style} />
    </View>
  </TouchableOpacity>
);

export { Icon, ButtonIcon, BigButtonIcon };
