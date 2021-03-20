import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: vh * 0.028,
    right: vw * 0.04,
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 250,
    borderWidth: 2,
    borderColor: "white",
  },
  editIcon: {
    tintColor: "white",
    position: "absolute",
    top: vh * 0.04,
    right: vw * 0.04,
  },
  totalRewards: {
    flexWrap: "wrap",
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "space-evenly",
    margin: 10,
    marginTop: 25,
    marginBottom: 25,
    width: vw * 0.85,
  },
  logout: {
    backgroundColor: "red",
    borderRadius: 10,
    width: "100%",
    bottom: 0,
    textAlign: "center",
    position: "absolute",
    height: 45,
    textAlignVertical: "center",
    fontSize: 25,
  },
});

export const profileDataStyles = {
  mainInfo: { color: "white", fontSize: 18 },
  otherInfo: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1,
    margin: 5,
    padding: 10,
  },
  get name() {
    return { ...this.mainInfo, textAlign: "center", fontSize: 25 };
  },
  get email() {
    return { ...this.mainInfo, textAlign: "center", fontStyle: "italic" };
  },
  get total() {
    return { ...this.mainInfo, fontSize: 20 };
  },
  get dob() {
    return { ...this.otherInfo };
  },
  get addr1() {
    return { ...this.otherInfo };
  },
  get addr2() {
    return { ...this.otherInfo };
  },
};
