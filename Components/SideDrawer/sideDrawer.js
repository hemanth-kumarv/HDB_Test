import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle } from "../Redux/dispatchers";
import SideDrawerContents from "./sideDrawerContents";
import CompanySideDrawerContents from "./companySideDrawerContents";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import HamIcon from "../../assets/hamburger.svg";

const SideDrawer = ({ navigation, route }) => {
  const open = useSelector((state) => state.drawerOpen);
  const dispatch = useDispatch();

  const userType = useSelector((state) => state.UserType);

  return (
    <View style={styles.drawerContainer}>
      {open ? (
        <View>
          {userType === "Customer" ? (
            <SideDrawerContents navigation={navigation} route={route} />
          ) : (
            <CompanySideDrawerContents navigation={navigation} route={route} />
          )}
        </View>
      ) : null}
      {open ? null : (
        <HamIcon
          width="35"
          height="35"
          style={styles.icon}
          onPress={() => dispatch(changeDrawerStyle(true))}
        />
      )}
    </View>
  );
};

export default SideDrawer;
