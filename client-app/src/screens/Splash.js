import React from "react";
import { View, Animated } from "react-native";

// Custom utils
import fadeAnimation from "../utils/FadeAnimation";

// Custom style
import useSplashStyle from "../styles/Style";

// Custom image
import splashLogo from "../../assets/icons/logo.png";

const Splash = () => {
  return (
    <View style={useSplashStyle.container}>
      <Animated.Image
        source={splashLogo}
        style={[useSplashStyle.sPlashLogo, { opacity: fadeAnimation(1, 2000) }]}
      />
    </View>
  );
};

export default Splash;
