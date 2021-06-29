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
    display: "flex",
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
  table: {
    top: vh * 0.12,
    width: vw * 0.96,
    maxHeight: vh * 0.8,
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 7,
    padding: 5,
  },
  adTableData: {
    color: "#fff",
    fontSize: 21,
    textAlign: "center",
    textAlignVertical: "center",
  },
  adTableRow: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#2176FF",
    width: vw * 0.7,
    marginBottom: 6,
    marginTop: 5,
    height: 50,
    alignSelf: "flex-end",
    // width: vw * 0.75,
  },
  adQueueBar: {
    position: "absolute",
    bottom: 0,
    width: vw,
    height: vh * 0.07,
    borderRadius: 10,
    justifyContent: "space-evenly",
    zIndex: 15,
    backgroundColor: "lime",
  },
  adQueueText: {
    fontSize: 25,
    textAlign: "center",
  },
});

export const adsTdWidth = {
  prop: {},
  // get no() {
  //   return { ...this.prop, flex: 0.3 };
  // },
  get ad() {
    return { ...this.prop, flex: 1.6, marginHorizontal: 5 };
  },
  get reward() {
    return { ...this.prop, fontSize: 20, flex: 1.2, color: "#7bfb26" };
  },
};
