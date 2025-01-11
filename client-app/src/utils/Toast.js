import Snackbar from "react-native-snackbar";

const toast = {
  snackBar: (message) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
    });
  },
};

export default toast;
