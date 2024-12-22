import axios from "axios";
import Toast from "../utils/Toast";

const Login_URL = "http://192.168.245.139:86/api/v1/auth/login";

const Api = {
  Login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const parms = { email, password };
      const response = await axios.post(Login_URL, parms);
      const { status, code, message, result } = response.data;

      if (status === "SUCCESS" && code === 200) {
        Toast.Snackbar(message);
        return result;
      } else {
        Toast.Snackbar(message);
        return null;
      }
    } catch (error) {
      const { message } = error.response?.data || {
        message: "An error occurred",
      };
      Toast.Snackbar(message);
      return null;
    }
  },
};

export default Api;
