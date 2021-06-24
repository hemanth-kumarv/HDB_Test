import axios from "../axiosServer";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../SideDrawer/sideDrawer";
import { styles } from "./adQueueStyles";
import { changeDrawerStyle, setAsyncStorage } from "../Redux/dispatchers";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import { useIsFocused } from "@react-navigation/core";
import ProfileIconPage from "../ProfilePage/profileIcon";
// import SortableList from "react-native-sortable-list";
import Row from "./adRow";

const AdQueuePage = ({ route, navigation }) => {
  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const data = {
    0: {
      image: "https://placekitten.com/200/240",
      text: "Chloe",
    },
    1: {
      image: "https://placekitten.com/200/201",
      text: "Jasper",
    },
    2: {
      image: "https://placekitten.com/200/202",
      text: "Pepper",
    },
    3: {
      image: "https://placekitten.com/200/203",
      text: "Oscar",
    },
    4: {
      image: "https://placekitten.com/200/204",
      text: "Dusty",
    },
  };
  // const dispatch = useDispatch();
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     if (drawerOpen) dispatch(changeDrawerStyle(false));
  //   }
  // }, [isFocused]);

  return (
    // <ScrollView
    //   style={globalStyles.container}
    //   contentContainerStyle={globalStyles.containerContent}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={false}
    //       onRefresh={() => retrieveRewards(userName)}
    //     />
    //   }
    // >
    //   <SideDrawer navigation={navigation} route={route} />
    <View
      style={[styles.container]} //, drawerOpen ? { opacity: 0.2 } : { opacity: 1 }]}
      // onStartShouldSetResponder={() => {
      //   if (drawerOpen) dispatch(changeDrawerStyle(false));
      // }}
    >
      <Text style={styles.title}>React Native Sortable List</Text>
      <SortableList
        horizontal={false}
        style={{ flex: 1, height: 100 }}
        contentContainerStyle={{
          width: "100%",
          paddingHorizontal: 0,
          height: 150,
        }}
        data={data}
        renderRow={(props) => {
          // console.log(props);
          return <Row data={props.data} active={props.active} />;
        }}
      />
    </View>
    // </ScrollView>
  );
};
export default AdQueuePage;
