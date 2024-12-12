import { MMKV } from "react-native-mmkv";

// Initialize MMKV
const storage = new MMKV();

const sessionName = "userSession";

const Session = {
  get: () => {
    try {
      const session = storage.getString(sessionName);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  },

  set: (sessionData) => {
    try {
      storage.set(sessionName, JSON.stringify(sessionData));
    } catch (error) {
      console.error("Error saving session:", error);
    }
  },

  clear: () => {
    try {
      storage.delete(sessionName);
    } catch (error) {
      console.error("Error removing session:", error);
    }
  },
};

export default Session;
