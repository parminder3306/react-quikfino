import Snackbar from "react-native-snackbar";

const ToastBar = (message) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
  });
};

export default ToastBar;
