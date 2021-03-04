import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";
import globalStyles from "../../globalStyles";
// import Drawer from "react-native-drawer";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle } from "../Redux/dispatchers";
import SideDrawerContents from "./sideDrawerContents";
import HamIcon from "../../assets/hamburger.svg";

const SideDrawer = ({ navigation }) => {
  const open = useSelector(state => state.drawerOpen);
  const dispatch = useDispatch();
  return (
    <View style={styles.drawerContainer}>
      {open ? (
        <View>
          <SideDrawerContents navigation={navigation} />
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
