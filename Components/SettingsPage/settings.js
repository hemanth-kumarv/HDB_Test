// import axios from "../axiosServer";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
} from "react-native";
import globalStyles from "../../globalStyles";
// import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import { styles } from "./settingPageStyles";
import RNFS from "react-native-fs";
// import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import ErrorSVG from "../../assets/exclamation-triangle.svg";
// import { useIsFocused } from "@react-navigation/core";

const SettingsPage = ({ route, navigation }) => {
  const [ip, setIP] = useState("");
  useEffect(() => {
    (async () => {
      var configData = await AsyncStorage.getItem("configData");
      var configDataJSON = JSON.parse(configData);
      setIP(configDataJSON.ExpressServer.ServerIP);
    })();
  }, []);

  const changeIP = async () => {
    var configData = await AsyncStorage.getItem("configData");
    var configDataJSON = JSON.parse(configData);
    configDataJSON.ExpressServer.ServerIP = ip;
    await AsyncStorage.setItem("configData", JSON.stringify(configDataJSON));
    Keyboard.dismiss();
  };
  return (
    <View style={globalStyles.container}>
      <Text
        style={styles.inputBox}
        onPress={() =>
          RNFS.readFile("./settingPageStyles.js").then((file) =>
            console.log(file)
          )
        }
      >
        Change IP Address:
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="IP Address"
        placeholderTextColor="#aaaa"
        textContentType="username"
        value={ip}
        onChangeText={(data) => setIP(data)}
        onSubmitEditing={changeIP}
      />
      <Text style={styles.submitButton} onPress={changeIP}>
        Change
      </Text>
    </View>
  );
};
export default SettingsPage;
