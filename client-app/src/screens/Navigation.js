import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom screens
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgetPassword from "./auth/ForgetPassword";
import Main from "./Main";

const Navigation = ({ isLoggedIn, sessionData }) => {
  const routeName = isLoggedIn ? "Main" : "Login";
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={routeName}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
