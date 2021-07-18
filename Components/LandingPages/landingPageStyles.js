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
    display: "flex",
  },
  table: {
    top: vh * 0.12,
    width: vw * 0.96,
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 7,
    padding: 5,
  },
  tableRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 2,
    margin: 5,
    borderRadius: 10,
    padding: 3,
  },
  tableData: {
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
  },
  adTableRow: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#2176FF",
    marginBottom: 5,
    marginTop: 5,
    height: 60,
    alignSelf: "flex-end",
    // width: vw * 0.75,
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
    zIndex: 10,
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

export const tdWidth = {
  prop: { fontSize: 23 },
  get ad() {
    return { ...this.prop, flex: 2, fontSize: 25 };
  },
  get date() {
    return { ...this.prop, fontSize: 15 };
  },
  get reward() {
    return { ...this.prop, flex: 1, color: "lime" };
  },
  get duration() {
    return { ...this.prop, flex: 1 };
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
    return { ...this.prop, flex: 1.75 };
  },
  get reward() {
    return { ...this.prop, flex: 1, color: "#7bfb26" };
  },
};