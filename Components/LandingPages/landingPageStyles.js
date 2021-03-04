import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize: 25,
    top: vh * 0.04,
    right: 0.15 * vw,
    position: "absolute",
  },
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
  },
  tableRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
  },
  tableData: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    borderLeftWidth: 2,
    borderColor: "gray",
  },
});

export const tdWidth = {
  prop: {},
  get no() {
    return { ...this.prop, width: vw * 0.1, };
  },
  get date() {
    return { ...this.prop, width: vw * 0.17 };
  },
  get ad() {
    return { ...this.prop, width: vw * 0.3 };
  },
  get reward() {
    return { ...this.prop, width: vw * 0.2 };
  },
  get duration() {
    return { ...this.prop, width: vw * 0.23 };
  },
  get total() {
    return { ...this.prop, width: vw * 0.57 };
  },
  get totalRewards() {
    return { ...this.prop, width: vw * 0.2 };
  },
  get totalDuration() {
    return { ...this.prop, width: vw * 0.23 };
  },
};
