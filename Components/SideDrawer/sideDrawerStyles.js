import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

const styles = StyleSheet.create({
  drawerContainer: {
    // alignItems: "stretch",
    position: "absolute",
    zIndex: 6,
    width: vw * 0.6,
    height: vh,
    top: 0,
    left: 0,
    // paddingTop: 50,
  },
  drawer: {
    top: 0,
    width: vw * 0.6,
    left: 0,
    height: vh,
    alignItems: "flex-end",
    // position: "absolute",
    zIndex: 10,
    textAlign: "right",
    backgroundColor: "#181818",
  },
  drawerButtons: {
    right: 5,
    color: "#fff",
    fontSize: 20,
    marginTop: 18,
    // overflow: "visible",
  },
  icon: {
    position: "absolute",
    top: vh * 0.04,
    left: vw * 0.04,
    // zIndex: 8,
    tintColor: "white",
  },
});

export default styles;
