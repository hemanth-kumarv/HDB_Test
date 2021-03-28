import { StyleSheet, Dimensions } from "react-native";
const vw = Dimensions.get("window").width,
  vh = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    inputBox: {
        color: 'white',
        fontSize: 50
    }
});
