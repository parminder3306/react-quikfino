// React-Native libraries
import React, { useState, useEffect } from "react";

// Custom utils
import appBar from "./utils/AppBar";
import session from "./utils/Session";
import permission from "./utils/Permission";
import notification from "./utils/Notification";

// Custom screens
import Splash from "./screens/Splash.js";
import Navigation from "./screens/Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const sessionGet = await session.get();
        appBar.hide();
        permission.notification();
        notification.token();
        notification.onMessage();
        setIsLoggedIn(!!sessionGet);

        setTimeout(() => {
          appBar.show();
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
