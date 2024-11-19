import AsyncStorage from "@react-native-async-storage/async-storage";

const sessionName = "userSession";

const Session = {
  get: async () => {
    try {
      const session = await AsyncStorage.getItem(sessionName);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  },

  set: async (sessionData) => {
    try {
      await AsyncStorage.setItem(sessionName, JSON.stringify(sessionData));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.removeItem(sessionName);
    } catch (error) {
      console.error("Error removing session:", error);
    }
  },
};

export default Session;
