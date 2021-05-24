import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontSize: 30,
    alignItems: "center",
    top: vh * 0.05
  },
  inputContainer: {
    top: vh * 0.1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingBottom: "40%"
  },
  textInput: {
    color: "#fff",
    borderColor: "#11191C",
    borderBottomColor: "gray",
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 2,
    padding: 5,
    width: "70%"
  },
  button: {
    top: vh * 0.75,
    color: "white",
    backgroundColor: "#007bff",
    width: "65%",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    fontSize: 18
  },
  icon: {
    position: "absolute",
    bottom: vh * 0.23,
    tintColor: "white"
  },
  dropdownPicker: {
    borderRadius: 15,
    width: "70%",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    overflow: "hidden"
  },
  cameraStyle: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
    // zIndex: 10,
    width: vw,
    height: vh
  },
  chooserContainer: {
    // top: 0,
    // height: vh,
    // width: vw,
    // position: 'absolute',
    // flex: 1,
    // padding: 30,
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  chooserButton: {
    width: 250,
    height: 60,
    backgroundColor: "#3740ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 12
  },
  chooserButtonText: {
    textAlign: "center",
    fontSize: 15,
    color: "#fff"
  }
});

export default styles;
