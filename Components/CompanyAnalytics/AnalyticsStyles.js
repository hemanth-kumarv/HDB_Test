import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  lineChartContainer: {
    color: "#fff",
    marginBottom: 5,
    marginLeft: 15,
    fontSize: 25,
  },
  labels: { flexDirection: "column", position: "absolute", right: 10 },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  labelColor: {
    width: 15,
    height: 15,
    borderRadius: 20,
  },
  labelText: { color: "#fff", marginHorizontal: 5, fontSize: 20 },
});
