import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const useBottomTabIcon = (icon, color) => (
  <FontAwesomeIcon icon={icon} size={20} color={color} />
);

const useHeaderRightIcon = (icon, onPressAction) => (
  <TouchableOpacity onPress={onPressAction}>
    <FontAwesomeIcon
      icon={icon}
      size={20}
      color={"#FF5C4F"}
      style={{ marginRight: 15, padding: 10 }}
    />
  </TouchableOpacity>
);

export { useBottomTabIcon, useHeaderRightIcon };
