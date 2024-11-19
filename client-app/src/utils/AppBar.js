import { StatusBar } from "react-native";

const AppBar = {
  show: () => {
    StatusBar.setHidden(false, "slide");
    StatusBar.setBackgroundColor("#FFFFFF");
    StatusBar.setBarStyle("dark-content");
  },

  hide: () => {
    StatusBar.setHidden(true, "slide");
    StatusBar.setBackgroundColor("#FFFFFF");
    StatusBar.setBarStyle("dark-content");
  },
};

export default AppBar;
