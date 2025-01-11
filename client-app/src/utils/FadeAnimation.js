import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const fadeAnimation = (toValue = 1, duration = 1000) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [animation, toValue, duration]);

  return animation;
};

export default fadeAnimation;
