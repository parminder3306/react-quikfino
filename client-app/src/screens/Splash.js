import React from "react";
import { View, Animated } from "react-native";

// Custom utils
import FadeAnimation from "../utils/FadeAnimation";

// Custom style
import useSplashStyle from "../styles/useAppStyle";

// Custom image
import splashLogo from "../../assets/icons/logo.png";

const Splash = () => {
  return (
    <View style={useSplashStyle.container}>
      <Animated.Image
        source={splashLogo}
        style={[useSplashStyle.sPlashLogo, { opacity: FadeAnimation(1, 2000) }]}
      />
    </View>
  );
};

export default Splash;
