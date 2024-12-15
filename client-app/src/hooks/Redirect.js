// Custom utils
import Session from "../utils/Session";

const Redirect = {
  GoToMain: (navigation) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  },

  GoToLogin: async (navigation) => {
    Session.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  },
};

export default Redirect;
