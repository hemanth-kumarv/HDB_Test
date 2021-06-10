import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#52b788",
    borderRadius: 10,
    fontSize: 20,
    width: "60%",
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    padding: 8,
  },
  prevAds: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    maxHeight: vh * 0.7,
    top: vh * 0.02,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 25,
  },
});
