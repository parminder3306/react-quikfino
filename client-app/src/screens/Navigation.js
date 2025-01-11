import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom screens
import login from "./auth/Login";
import signUp from "./auth/SignUp";
import forgetPassword from "./auth/ForgetPassword";
import main from "./Main";

const navigation = ({ isLoggedIn, sessionData }) => {
  const routeName = isLoggedIn ? "Main" : "Login";
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={routeName}
      >
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="signUp" component={signUp} />
        <Stack.Screen name="forgetPassword" component={forgetPassword} />
        <Stack.Screen name="main" component={main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
