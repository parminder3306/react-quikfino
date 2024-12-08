// Custom utils
import Session from "../utils/Session";

const useGoToMain = (navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: "Main" }],
  });
};

const useBackToLogin = async (navigation) => {
  Session.clear();
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

export { useGoToMain, useBackToLogin };
