import { StyleSheet } from "react-native";
import { primary } from "./Colors";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginRight: 15,
  },
  headerIcon: {
    marginRight: 8,
  },

  logoutIcon: {
    marginRight: 15,
    padding: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: 65,
    borderTopWidth: 0,
    elevation: 0,
  },
  sPlashLogo: {
    width: 300,
    height: 100,
    top: -20,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#969696",
    marginBottom: 40,
  },
  inputContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputRightIcon: {
    position: "absolute",
    right: 13,
    bottom: 5,
    padding: 10,
    borderRadius: 100,
  },

  errorContainer: {
    alignItems: "flex-start",
    width: "100%",
  },

  inputError: {
    width: "100%",
    height: 50,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
    textAlign: "left",
    // fontSize: 12,
    marginBottom: 15,
    // marginLeft: 4,
  },

  buttonPrimary: {
    width: "100%",
    height: 50,
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bigButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  bigButton: {
    width: 50,
    height: 50,
    backgroundColor: primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  bigButtonText: {
    fontSize: 10,
    top: 5,
    fontWeight: "bold",
  },
  link: {
    color: primary,
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default style;
