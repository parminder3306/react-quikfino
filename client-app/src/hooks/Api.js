import axios from "axios";
import Toast from "../utils/Toast";

const Login_URL = "http://192.168.254.139:86/api/v1/auth/login";

const Api = {
  Login: async (email, password) => {
    try {
      const parms = { email, password };
      const response = await axios.post(Login_URL, parms);
      const { status, code, message, result } = response.data;

      if (status === "SUCCESS" && code === 200) {
        Toast.Snackbar(message);
        return result;
      }
    } catch (error) {
      const { message } = error.response.data;
      Toast.Snackbar(message);
      return null;
    }
  },
};

export default Api;
