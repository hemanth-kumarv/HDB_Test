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
  walletBalance: {
    color: "white",
    fontSize: 40,
    height: vh * 0.2,
    backgroundColor: "dodgerblue",
    width: vw * 0.8,
    paddingLeft: "10%",
    paddingTop: "4%",
    alignSelf: "center",
    borderRadius: 20,
  },
  depositButton: {
    color: "black",
    backgroundColor: "lime",
    fontSize: 20,
    marginTop: 10,
    alignSelf: "flex-end",
    right: 20,
    padding: 8,
    width: vw * 0.35,
    textAlign: "center",
    borderRadius: 10,
  },
  transactions: {
    marginTop: -30,
    backgroundColor: "#222",
    width: "90%",
    alignSelf: "center",
    borderRadius: 6,
    // height: vh,
  },
  prevTransactions: {
    fontSize: 25,
    color: "white",
    left: 10,
    margin: 10,
  },
});

export const txnTableStyles = {
  prop: { color: "white" },
  get Row() {
    return {
      ...this.prop,
      borderWidth: 2,
      borderColor: "white",
      margin: 5,
      borderRadius: 5,
      padding: 10,
    };
  },
  get TxnId() {
    return { ...this.prop, fontSize: 18 };
  },
  get Amount() {
    return { ...this.prop, fontSize: 30, right: 8, position: 'absolute', top: 10, color: 'lightgreen' };
  },
  get Time() {
    return { ...this.prop, fontSize: 15 };
  },
  get Date() {
    return { ...this.prop, fontSize: 15 };
  },
};
