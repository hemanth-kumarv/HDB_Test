import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    width: vw,
    height: vh,
    position: "absolute",
    zIndex: 4,
    top: 0,
    left: 0,
  },
  table: {
    top: vh * 0.12,
    alignSelf: "stretch",
    height: vh * 0.85,
  },
  heading: {
    color: "#fff",
    fontSize: 25,
    top: vh * 0.04,
    width: vw * 0.6,
    left: 0.2 * vw,
    textAlign: "center",
    position: "absolute",
  },
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
  adTableData: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
  },
  adTableRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#2176FF",
    marginBottom: 5,
    marginTop: 5,
    height: 60,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 25,
  },
});
