import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: vh,
    width: vw,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1ff",
    // padding: 16,
    height: 50,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    width: vw*0.5,
    elevation: 0,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  text: {
    fontSize: 24,
    color: "#222222",
  },
});
