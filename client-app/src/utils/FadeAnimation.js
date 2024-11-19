import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const FadeAnimation = (toValue = 1, duration = 1000) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, toValue, duration]);

  return fadeAnimation;
};

export default FadeAnimation;
