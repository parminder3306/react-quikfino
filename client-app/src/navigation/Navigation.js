import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Custom screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import Main from "../screens/Main";

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
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen
          name="Main"
          component={Main}
          initialParams={{ sessionData }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
