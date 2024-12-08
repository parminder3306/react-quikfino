import { MMKV } from "react-native-mmkv";

// Initialize MMKV
const storage = new MMKV();

const sessionName = "userSession";

const Session = {
  get: () => {
    try {
      const session = storage.getString(sessionName); // Retrieve string
      return session ? JSON.parse(session) : null; // Parse JSON if exists
    } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
    }
  },

  set: (sessionData) => {
    try {
      storage.set(sessionName, JSON.stringify(sessionData)); // Store JSON as string
    } catch (error) {
      console.error("Error saving session:", error);
    }
  },

  clear: () => {
    try {
      storage.delete(sessionName); // Remove the key from MMKV
    } catch (error) {
      console.error("Error removing session:", error);
    }
  },
};

export default Session;
