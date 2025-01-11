import { PermissionsAndroid, Platform, Alert, Linking } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const permission = {
  askAgain: (message) => {
    Alert.alert(
      "Permission Denied",
      message,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Settings",
          onPress: () => permission.appSettings(),
        },
      ],
      { cancelable: false }
    );
  },

  appSettings: () => {
    if (Platform.OS === "android") {
      Linking.openSettings();
    } else {
      Linking.openURL("app-settings:");
    }
  },

  camera: async () => {
    if (Platform.OS === "android") {
      const permissionStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission already granted");
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission granted");
        } else {
          console.log("Camera permission denied");
        }
      }
    } else {
      const permissionStatus = await check(PERMISSIONS.IOS.CAMERA);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log("Camera permission granted");
      } else {
        const newPermissionStatus = await request(PERMISSIONS.IOS.CAMERA);
        if (newPermissionStatus === RESULTS.GRANTED) {
          console.log("Camera permission granted");
        } else {
          console.log("Camera permission denied");
        }
      }
    }
  },

  notification: async () => {
    if (Platform.OS === "android") {
      const permissionStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (permissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Permission.askAgain(
            "We need permission to send notifications. Please enable notifications in settings."
          );
        }
      }
    } else {
      // iOS
      const permissionStatus = await check(PERMISSIONS.IOS.NOTIFICATIONS);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log("Notification permission granted");
      } else {
        const newPermissionStatus = await request(
          PERMISSIONS.IOS.NOTIFICATIONS
        );
        if (newPermissionStatus === RESULTS.GRANTED) {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      }
    }
  },

  location: async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } else {
      const permissionStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      );
      if (permissionStatus === RESULTS.GRANTED) {
        console.log("Location permission granted");
      } else {
        const newPermissionStatus = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        );
        if (newPermissionStatus === RESULTS.GRANTED) {
          console.log("Location permission granted");
        } else {
          console.log("Location permission denied");
        }
      }
    }
  },

  microphone: async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Microphone permission granted");
      } else {
        console.log("Microphone permission denied");
      }
    } else {
      const permissionStatus = await check(PERMISSIONS.IOS.MICROPHONE);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log("Microphone permission granted");
      } else {
        const newPermissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
        if (newPermissionStatus === RESULTS.GRANTED) {
          console.log("Microphone permission granted");
        } else {
          console.log("Microphone permission denied");
        }
      }
    }
  },

  contacts: async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Contacts permission granted");
      } else {
        console.log("Contacts permission denied");
      }
    } else {
      const permissionStatus = await check(PERMISSIONS.IOS.CONTACTS);
      if (permissionStatus === RESULTS.GRANTED) {
        console.log("Contacts permission granted");
      } else {
        const newPermissionStatus = await request(PERMISSIONS.IOS.CONTACTS);
        if (newPermissionStatus === RESULTS.GRANTED) {
          console.log("Contacts permission granted");
        } else {
          console.log("Contacts permission denied");
        }
      }
    }
  },

  storage: async () => {},
};

export default permission;
