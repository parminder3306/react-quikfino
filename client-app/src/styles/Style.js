import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputRightIcon: {
    position: "absolute",
    right: 13,
    bottom: 19,
    padding: 10,
    borderRadius: 100,
  },
  buttonPrimary: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6E40",
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
    width: 70,
    height: 70,
    backgroundColor: "#FF6E40",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  link: {
    color: "#FF6E40",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Style;
