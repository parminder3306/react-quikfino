import axios from "axios";
import ApiUrl from "../configs/ApiUrl";
import toast from "../utils/Toast";

const apiCall = {
  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const parms = { email, password };
      const response = await axios.post(ApiUrl.LOGIN_URL, parms);
      const { status, code, message, result } = response.data;

      if (status === "SUCCESS" && code === 200) {
        toast.snackBar(message);
        return result;
      } else {
        toast.snackBar(message);
        return null;
      }
    } catch (error) {
      const { message } = error.response?.data || {
        message: "An error occurred",
      };
      toast.snackBar(message);
      return null;
    }
  },

  signUp: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const parms = { email, password };
      const response = await axios.post(ApiUrl.SIGNUP_URL, parms);
      const { status, code, message, result } = response.data;

      if (status === "SUCCESS" && code === 201) {
        toast.snackBar(message);
        return result;
      } else {
        toast.snackBar(message);
        return null;
      }
    } catch (error) {
      const { message } = error.response?.data || {
        message: "An error occurred",
      };
      toast.snackBar(message);
      return null;
    }
  },
};

export default apiCall;
