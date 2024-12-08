import Snackbar from "react-native-snackbar";

const Toast = {
  Snackbar: (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  },
};

export default Toast;
