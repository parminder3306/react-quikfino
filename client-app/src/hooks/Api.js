import axios from "axios";
import Toast from "../utils/Toast";

const Base_URL = "http://192.168.216.139:86/v1/";

// Authentication
const Login_URL = Base_URL + "auth/login";
const SignUp_URL = Base_URL + "auth/signup";
const RefreshToken_URL = Base_URL + "auth/refresh-token";

// User management
const GetUser_URL = Base_URL + "users/{userId}";
const UpdateUser_URL = Base_URL + "users/{userId}";
const DeleteUser_URL = Base_URL + "users/{userId}";

// Product management
const GetProducts_URL = Base_URL + "products";
const GetProduct_URL = Base_URL + "products/{productId}";
const CreateProduct_URL = Base_URL + "products";
const UpdateProduct_URL = Base_URL + "products/{productId}";
const DeleteProduct_URL = Base_URL + "products/{productId}";

// Search and query
const Search_URL = Base_URL + "search";
const FilteredQuery_URL = Base_URL + "query";

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
  SignUp: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const parms = { email, password };
      const response = await axios.post(SignUp_URL, parms);
      const { status, code, message, result } = response.data;

      if (status === "SUCCESS" && code === 201) {
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
