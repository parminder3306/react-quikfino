import React from "react";
import { Image } from "react-native";

// Third-party libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  faHouse,
  faAddressBook,
  faMoneyBillTransfer,
  faGift,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Custom screens
import Home from "./main/Home";
import Recipients from "./main/Recipients";
import Send from "./main/Send";
import Rewards from "./main/Rewards";
import Profile from "./main/Profile";

// Custom hooks
import FaIcon from "../hooks/FaIcon";

// Custom styles
import Style from "../styles/Style";

// Static assets
import headerLogo from "../../assets/icons/header-logo.png";

const Main = ({ navigation, route }) => {
  const { sessionData } = route.params;
  const Tab = createBottomTabNavigator();
  const iconMap = {
    Home: faHouse,
    Recipients: faAddressBook,
    Send: faMoneyBillTransfer,
    Rewards: faGift,
    Profile: faUser,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <FaIcon.Icon icon={iconMap[route.name]} color={color} />
        ),
        tabBarStyle: Style.tabBar,
        tabBarActiveTintColor: "#FF6E40",
        tabBarInactiveTintColor: "#AAAAAA",
        headerStyle: Style.header,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              source={headerLogo}
              style={{ width: 100, height: 40 }}
              resizeMode="contain"
            />
          ),
        }}
        initialParams={{ sessionData: { email: "Parminder Singh" } }}
      />
      <Tab.Screen
        name="Send"
        component={Send}
        options={{
          tabBarButton: ({ accessibilityState }) => (
            <FaIcon.BigButtonIcon
              icon={faMoneyBillTransfer}
              size={24}
              color={accessibilityState?.selected ? "#FF6E40" : "#AAAAAA"}
              label="Send Money"
              navigateTo="Send"
            />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Main;
