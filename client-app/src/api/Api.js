import axios from "axios";

const API_BASE_URL = "https://yourapi.com/api";

const Api = {
  Login: async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
};

export default Api;
