import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from "@notifee/react-native";

const notification = {
  token: async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log("Device FCM Token:", token);
      }
    } catch (error) {
      console.error("Failed to get device token:", error);
    }
  },

  onMessage: async () => {
    messaging().onMessage(async (remoteMessage) => {
      await Notification.push(remoteMessage);
    });
  },

  push: async (remoteMessage) => {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        actions: [],
      },
    });
  },
};

export default notification;
