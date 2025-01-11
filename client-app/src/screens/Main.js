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
import home from "./main/Home";
import recipients from "./main/Recipients";
import send from "./main/Send";
import rewards from "./main/Rewards";
import profile from "./main/Profile";

// Custom hooks
import faIcon from "../hooks/FaIcon";

// Custom styles
import style from "../styles/Style";

// Static assets
import headerLogo from "../../assets/icons/header-logo.png";

const main = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const iconMap = {
    home: faHouse,
    recipients: faAddressBook,
    send: faMoneyBillTransfer,
    rewards: faGift,
    profile: faUser,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <faIcon.icon icon={iconMap[route.name]} color={color} />
        ),
        tabBarStyle: style.tabBar,
        tabBarActiveTintColor: "#FF6E40",
        tabBarInactiveTintColor: "#AAAAAA",
        headerStyle: style.header,
      })}
    >
      <Tab.Screen
        name="home"
        component={home}
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
        name="send"
        component={send}
        options={{
          tabBarButton: ({ accessibilityState }) => (
            <faIcon.iconBigButton
              icon={faMoneyBillTransfer}
              size={24}
              color={accessibilityState?.selected ? "#FF6E40" : "#AAAAAA"}
              label="Send Money"
              navigateTo="Send"
            />
          ),
        }}
      />
      <Tab.Screen name="profile" component={profile} />
    </Tab.Navigator>
  );
};

export default main;
