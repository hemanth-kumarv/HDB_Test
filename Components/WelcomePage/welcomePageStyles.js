import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

const styles = StyleSheet.create({
  logo: {
    fontSize: 50,
    color: "#fff",
    // height: '10%'
    // flex: 4,
  },
  inputContainer: {
    // flex: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 35,
  },
  loginText: {
    fontSize: 22,
    color: '#fff',
    alignSelf: "flex-start",
    left: vw * 0.12
  },
  textInput: {
    color: "#fff",
    borderBottomColor: "gray",
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 2,
    padding: 5,
    width: "70%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    right: vw * 0.1,
    top: 15,
    color: "#007bff",
  },
  button: {
    color: "white",
    backgroundColor: "#007bff",
    width: "65%",
    height: 45,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  registerContainer: {
    color: "white",
    top: "-4%"
  },
  registerText: { color: "lightgreen" },
});

export default styles;
