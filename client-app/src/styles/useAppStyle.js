import { StyleSheet } from "react-native";

const useAppStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    height: 60,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
    backgroundColor: "#FF5C4F",
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
  link: {
    color: "#FF5C4F",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default useAppStyle;
