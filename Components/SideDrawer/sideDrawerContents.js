import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import styles from "./sideDrawerStyles";

import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle } from "../Redux/dispatchers";
// import globalStyles from "../../globalStyles";
// import Drawer from "react-native-drawer";
import RightLeft from "../../assets/chevron-left.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SideDrawerContents = ({ navigation }) => {
  // const navigation = useNavigation();
  // const open = useSelector(state => state.drawerOpen);
  const dispatch = useDispatch();

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
        style={styles.drawerButtons}
        onPress={() => {
          navigation.navigate("WelcomePage");
        }}
      >
        Profile
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Bank Details
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Wallet
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Refer and Earn
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Settings
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Legal
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={() => navigation.navigate("")}
      >
        Terms and Conditions
      </Text>
      <Text
        style={styles.drawerButtons}
        onPress={async () => {
          await AsyncStorage.removeItem("UserId");
          navigation.replace("WelcomePage");
          dispatch(changeDrawerStyle(false));
        }}
      >
        Logout
      </Text>
    </View>
  );
  return <Menu />;
};

export default SideDrawerContents;
