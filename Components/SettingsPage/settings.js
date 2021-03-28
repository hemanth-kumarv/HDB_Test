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
} from "react-native";
import globalStyles from "../../globalStyles";
// import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import { styles } from "./settingPageStyles";
// import { changeDrawerStyle } from "../Redux/dispatchers";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ErrorSVG from "../../assets/exclamation-triangle.svg";
// import { useIsFocused } from "@react-navigation/core";

const SettingsPage = ({ route, navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.inputBox}>
        Change IP Address:
        <TextInput
          style={styles.textInput}
          placeholder="IP Address"
          placeholderTextColor="#aaaa"
          textContentType="username"
          onSubmitEditing={() => {
            mobileNumber.current.focus();
          }}
          value={fields.name.data}
          onChangeText={(data) => setFields(updateFields("name", data))}
          onBlur={() => setFields(updateFields("name", fields.name.data))}
        />
      </Text>
    </View>
  );
};
export default SettingsPage;
