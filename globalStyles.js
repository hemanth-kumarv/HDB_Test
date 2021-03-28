import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

const globalStyles = StyleSheet.create({
  container: {
    height: vh,
    width: vw,
    backgroundColor: "#11191C",
    // position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
  },
  containerContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#fff",
    flex: 1
  },
  verticalLine: {
    height: "80%",
    alignSelf: 'center',
    borderLeftColor: "white",
    borderWidth: 1,
  },
});

export default globalStyles;
