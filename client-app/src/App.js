// React-Native libraries
import React, { useState, useEffect } from "react";

// Custom utils
import appBar from "./utils/AppBar";
import session from "./utils/Session";
import permission from "./utils/Permission";
import notification from "./utils/Notification";

// Custom screens
import splash from "./screens/Splash";
import navigation from "./screens/Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const session = await Session.get();
        appBar.hide();
        permission.notification();
        notification.token();
        notification.onMessage();
        setIsLoggedIn(!!session);

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
    return <splash />;
  }

  return <navigation isLoggedIn={isLoggedIn} />;
};

export default App;
