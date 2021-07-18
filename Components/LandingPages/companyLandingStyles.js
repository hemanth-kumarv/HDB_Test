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
  table: {
    top: vh * 0.12,
    width: vw * 0.96,
    alignSelf: "center",
    padding: 5,
  },
  prevAds: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    maxHeight: vh * 0.35,
    top: vh * 0.02,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 25,
  },
  analyticsGraph: {
    bottom: 2,
    position: "absolute",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  },
});
