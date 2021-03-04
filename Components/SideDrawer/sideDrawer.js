import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";
import globalStyles from "../../globalStyles";
import Drawer from "react-native-drawer";
import SideDrawerContents from "./sideDrawerContents";
import HamIcon from "../../assets/hamburger.svg";

const SideDrawer = ({ navigation, drawerOpen }) => {
  const [open, setOpen] = useState(false);
  let hamIcon = open ? globalStyles.displayNone : globalStyles.displayAuto;
  return (
    <View style={styles.drawerContainer}>
      <View>
        <SideDrawerContents
          open={open}
          navigation={navigation}
          setOpen={setOpen}
          drawerOpen={drawerOpen}
        />
      </View>
      <HamIcon
        width="35"
        height="35"
        style={[styles.icon, hamIcon]}
        onPress={() => {
          drawerOpen(true);
          setOpen(true);
        }}
      />
    </View>
  );
};

export default SideDrawer;
