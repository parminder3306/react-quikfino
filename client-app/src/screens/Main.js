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
import faIcon from "../hooks/FaIcon";

// Custom styles
import style from "../styles/Style";
import color from "../styles/Color";

// Static assets
import headerLogo from "../../assets/icons/header-logo.png";

const Main = ({ navigation }) => {
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
          <faIcon.icon icon={iconMap[route.name]} color={color} />
        ),
        tabBarStyle: style.tabBar,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: "#AAAAAA",
        headerStyle: style.header,
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
            <faIcon.iconBigButton
              icon={faMoneyBillTransfer}
              size={24}
              color={accessibilityState?.selected ? color.primary : "#AAAAAA"}
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
