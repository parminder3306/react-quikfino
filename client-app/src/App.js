import React, { useState, useEffect } from "react";

// Custom utils
import AppBar from "./utils/AppBar";
import Session from "./utils/Session";
import Permission from "./utils/Permission";
import Notification from "./utils/Notification";

// Custom screens
import Splash from "./screens/Splash";

// Custom navigation
import Navigation from "./navigation/Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const session = await Session.get();
        AppBar.hide();
        Permission.notification();
        Notification.token();
        Notification.onMessage();
        setIsLoggedIn(!!session);

        setTimeout(() => {
          AppBar.show();
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initApp();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return <Navigation isLoggedIn={isLoggedIn} />;
};

export default App;
