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
import { Icon, ButtonIcon, BigButtonIcon } from "../hooks/Icon";

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
          <Icon
            icon={iconMap[route.name]}
            size={route.name === "Send" ? 24 : 20}
            color={route.name === "Send" ? "#FFFFFF" : color}
          />
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
          tabBarButton: () => (
            <BigButtonIcon
              icon={faMoneyBillTransfer}
              size={24}
              color={"#FFFFFF"}
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
