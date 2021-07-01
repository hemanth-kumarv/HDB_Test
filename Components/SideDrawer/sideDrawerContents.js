import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";

import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle, logout } from "../Redux/dispatchers";
// import globalStyles from "../../globalStyles";
// import Drawer from "react-native-drawer";
import RightLeft from "../../assets/chevron-left.svg";

const SideDrawerContents = ({ route, navigation }) => {
  // const navigation = useNavigation();
  // const open = useSelector(state => state.drawerOpen);
  const dispatch = useDispatch();

  const activeStyle = (pageName) =>
    route.name === pageName ? { backgroundColor: "lime", color: "black" } : {};
  const Menu = () => (
    <View style={styles.drawer}>
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
        onPress={() => dispatch(changeDrawerStyle(false))}
      />
      <Text
        style={[styles.drawerButtons, activeStyle("CustomerLandingPage")]}
        onPress={() => navigation.navigate("CustomerLandingPage")}
      >
        New Ad
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("RewardHistory")]}
        onPress={() => navigation.navigate("RewardHistory")}
      >
        Reward History
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("ProfilePage")]}
        onPress={() => {
          navigation.navigate("ProfilePage");
        }}
      >
        Profile
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("WalletPage")]}
        onPress={() => navigation.navigate("WalletPage")}
      >
        Wallet
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("")]}
        onPress={() => navigation.navigate("")}
      >
        Custom Display
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("")]}
        onPress={() => navigation.navigate("")}
      >
        Bank Details
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("")]}
        onPress={() => navigation.navigate("")}
      >
        Refer and Earn
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("SettingsPage")]}
        onPress={() => navigation.navigate("SettingsPage")}
      >
        Settings
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("")]}
        onPress={() => navigation.navigate("")}
      >
        Legal
      </Text>
      <Text
        style={[styles.drawerButtons, activeStyle("")]}
        onPress={() => navigation.navigate("")}
      >
        Terms {"&"} Conditions
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={async () => {
          dispatch(logout());
          navigation.replace("WelcomePage");
        }}
      >
        Logout
      </Text>
    </View>
  );
  return <Menu />;
};

export default SideDrawerContents;
