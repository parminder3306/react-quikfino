import axios from "axios";

const API_BASE_URL = "https://yourapi.com/api";

export const useLoginApi = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useLoginApi;
