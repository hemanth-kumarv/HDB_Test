import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";
import globalStyles from "../globalStyles";
// import Drawer from "react-native-drawer";
import RightLeft from "../../assets/chevron-left.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideDrawerContents = (props) => {
  // const navigation = useNavigation();
  const Menu = () => (
    <View
      style={[
        styles.drawer,
        props.open ? { display: "flex" } : { display: "none" },
      ]}
    >
      <RightLeft
        width="40"
        height="40"
        style={
          styles.drawerButtons
          // {
          //   // tintColor: "red",
          //   // position: 'absolute',
          //   // top: -40,
          //   // right: 5,
          // },
        }
        onPress={() => {
          props.drawerOpen(false);
          props.setOpen(false);
        }}
      />
      <Text
        style={styles.drawerButtons}
        onPress={() => {
          props.navigation.navigate("WelcomePage");
        }}
      >
        Profile
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Bank Details
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Wallet
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Refer and Earn
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Settings
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Legal
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => props.navigation.navigate("")}
      >
        Terms and Conditions
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={async () => {
          await AsyncStorage.removeItem("UserId");
          props.navigation.navigate("WelcomePage");
        }}
      >
        Logout
      </Text>
    </View>
  );
  return <Menu />;
};

export default SideDrawerContents;
