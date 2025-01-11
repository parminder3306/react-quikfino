// Custom utils
import session from "../utils/Session";

const redirect = {
  goToMain: (navigation) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  },

  goToLogin: async (navigation) => {
    session.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  },
};

export default redirect;
