import React from "react";
import { Image } from "react-native";

// Third-party libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  faHouse,
  faAddressBook,
  faMoneyBillTrendUp,
  faGift,
  faUser,
  faPowerOff,
  faBell,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

// Custom screens
import Home from "./main/Home";
import Recipients from "./main/Recipients";
import Send from "./main/Send";
import Rewards from "./main/Rewards";
import Profile from "./main/Profile";

// Custom hooks
import { useBackToLogin } from "../hooks/useRedirect";
import { useBottomTabIcon, useHeaderRightIcon } from "../hooks/useIcon";

// Custom styles
import useAppStyle from "../styles/useAppStyle";

// Static assets
const headerLogo = require("../../assets/icons/header-logo.png");

const Main = ({ navigation, route }) => {
  const { sessionData } = route.params;
  const Tab = createBottomTabNavigator();
  const iconMap = {
    Home: faHouse,
    Recipients: faAddressBook,
    Send: faMoneyBillTrendUp,
    Rewards: faGift,
    Profile: faUser,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          return useBottomTabIcon(iconMap[route.name], color);
        },
        tabBarStyle: useAppStyle.tabBar,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/icons/header-logo.png")}
              style={{ width: 100, height: 40 }}
              resizeMode="contain"
            />
          ),
          headerRight: () =>
            useHeaderRightIcon(faBell, () => useBackToLogin(navigation)),
          headerStyle: useAppStyle.header,
          tabBarActiveTintColor: "#FF5C4F",
          tabBarInactiveTintColor: "#969696",
        }}
        initialParams={{ sessionData: { email: "Parminder Singh" } }}
      />

      <Tab.Screen
        name="Recipients"
        component={Recipients}
        options={{
          headerRight: () =>
            useHeaderRightIcon(faCirclePlus, () => useBackToLogin(navigation)),
          headerStyle: useAppStyle.header,
          tabBarActiveTintColor: "#FF5C4F",
          tabBarInactiveTintColor: "#969696",
        }}
      />
      <Tab.Screen
        name="Send"
        component={Send}
        options={{
          headerStyle: useAppStyle.header,
          tabBarActiveTintColor: "#FF5C4F",
          tabBarInactiveTintColor: "#969696",
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={Rewards}
        options={{
          headerStyle: useAppStyle.header,
          tabBarActiveTintColor: "#FF5C4F",
          tabBarInactiveTintColor: "#969696",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () =>
            useHeaderRightIcon(faPowerOff, () => useBackToLogin(navigation)),
          headerStyle: useAppStyle.header,
          tabBarActiveTintColor: "#FF5C4F",
          tabBarInactiveTintColor: "#969696",
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
