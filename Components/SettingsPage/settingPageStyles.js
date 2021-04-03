import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  inputBox: {
    color: "white",
    fontSize: 20,
  },
  textInput: {
    color: "#fff",
    borderTopColor: "#000",
    borderBottomColor: "gray",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    width: "70%",
  },
  submitButton: {
    fontSize: 25,
    backgroundColor: "dodgerblue",
    width: vw * 0.3,
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 20
  },
});
