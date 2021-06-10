import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize: 25,
    top: vh * 0.04,
    width: vw * 0.6,
    left: 0.2 * vw,
    textAlign: "center",
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
    height: vh * 0.85
  },
  tableRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
    // padding: 3,
    paddingVertical: 8,
  },
  tableData: {
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
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
  adTableData: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
  },
  errorTextContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    top: "30%",
    height: vh * 0.8,
  },
  errorText: {
    color: "red",
    width: 0.7 * vw,
    top: 20,
    flex: 3,
    textAlign: "center",
    fontSize: 30,
  },
  retryButton: {
    top: 10,
    color: "blue",
    fontSize: 40,
    flex: 2,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  newAd: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    width: "100%",
    bottom: 0,
    textAlign: "center",
    position: "absolute",
    height: 45,
    textAlignVertical: "center",
    fontSize: 25,
  },
  btIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 10,
  },
});

export const tdWidth = {
  prop: { fontSize: 23 },
  get ad() {
    return { ...this.prop, width: vw * 0.5, fontSize: 25 };
  },
  get date() {
    return { ...this.prop, fontSize: 15 };
  },
  get reward() {
    return { ...this.prop, width: vw * 0.23, color: "lime" };
  },
  get duration() {
    return { ...this.prop, width: vw * 0.2 };
  },
  get total() {
    return { ...this.prop, fontSize: 27 };
  },
};

export const adsTdWidth = {
  prop: {},
  // get no() {
  //   return {...this.prop, width: vw * 0.1}
  // },
  get ad() {
    return { ...this.prop, width: vw * 0.45 };
  },
  get reward() {
    return { ...this.prop, width: vw * 0.25, color: "#7bfb26" };
  },
};
