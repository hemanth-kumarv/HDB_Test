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
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import { styles, tdWidth } from "./landingPageStyles";
import { changeDrawerStyle, setAsyncStorage } from "../Redux/dispatchers";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import { useIsFocused } from "@react-navigation/core";
import ProfileIconPage from "../ProfilePage/profileIcon";

const timeFormatter = (time) => {
  let strArray = time.split(" ");
  return "".concat(
    strArray[2],
    " ",
    strArray[1],
    " ",
    strArray[4],
    "\n(",
    strArray[0],
    ") ",
    strArray[3]
  );
};

const RewardHistory = ({ route, navigation }) => {
  const [rewardsList, setRewardsList] = useState({});
  const [searching, setSearching] = useState(false);
  const userName = useSelector((state) => state.UserId);

  const totalRewards = useSelector((state) => state.TotalRewards);
  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const retrieveRewards = (userName) => {
    // console.log("searching...", userName);

    setSearching(false);
    axios.then((server) =>
      server
        .post("/getRewards", { name: userName })
        .then(async (res) => {
          // console.log("NEW USER: ", await AsyncStorage.getItem("UserId"));
          setRewardsList(res.data);

          dispatch(
            setAsyncStorage([["TotalRewards", JSON.stringify(res.data.Total)]])
          );
          // await AsyncStorage.setItem(
          //   "TotalRewards",
          //   JSON.stringify(res.data.Total)
          // );
          setSearching(true);
        })
        .catch((err) => {
          // setRewardsList({
          //   status: false,
          //   message: "Error connecting to server.",
          // });
          setSearching(true);
          console.log(err);
        })
    );
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }
    if (Object.keys(rewardsList).length === 0 && !searching) {
      (async () => retrieveRewards(userName))();
    }
  }, [isFocused]);
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => retrieveRewards(userName)}
        />
      }
    >
      <SideDrawer navigation={navigation} route={route} />
      <View
        style={[
          styles.container,
          drawerOpen ? { opacity: 0.2 } : { opacity: 1 },
        ]}
        onStartShouldSetResponder={() => {
          if (drawerOpen) dispatch(changeDrawerStyle(false));
        }}
      >
        {searching ? (
          <>
            <Text style={styles.heading}>Reward History</Text>
            <ProfileIconPage navigation={navigation} route={route} />
            {!rewardsList.status ? (
              <View style={styles.errorTextContainer}>
                <ErrorSVG
                  width="50"
                  height="50"
                  style={{
                    tintColor: "yellow",
                  }}
                />
                <Text style={styles.errorText}>{rewardsList.message}</Text>
                <Text
                  style={styles.retryButton}
                  onPress={() => retrieveRewards(userName)}
                >
                  Retry
                </Text>
              </View>
            ) : (
              <View style={styles.table}>
                <Text style={[styles.tableData]}>
                  You earned {"\n"}
                  <Text style={tdWidth.total}>
                    Rs. {rewardsList.Total.Amount} (
                    {parseInt(rewardsList.Total.Time / 60)} min{" "}
                    {parseInt(rewardsList.Total.Time % 60)} sec)
                  </Text>
                </Text>
                <ScrollView style={{ maxHeight: "87%" }}>
                  {rewardsList.Rewards.map((i, j) => (
                    <View style={styles.tableRow} key={j}>
                      <Text style={[styles.tableData, tdWidth.ad]}>
                        {i.AdName}
                        {"\n"}
                        <Text style={[styles.tableData, tdWidth.date]}>
                          {timeFormatter(i.DateTime)}
                        </Text>
                      </Text>
                      <Text style={[styles.tableData, tdWidth.reward]}>
                        <Text style={{ fontSize: 22, color: "white" }}>
                          Rs.
                        </Text>{" "}
                        {"\n"}
                        {i.Reward}
                      </Text>
                      <Text style={[styles.tableData, tdWidth.duration]}>
                        {i.Duration}
                        {"\n"} <Text style={{ fontSize: 17 }}>seconds</Text>
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        ) : (
          <View style={{ top: 250 }}>
            <ActivityIndicator size={75} color="#fff" />
          </View>
        )}
      </View>
      <Text
        style={styles.newAd}
        onPress={() => navigation.navigate("CustomerLandingPage")}
      >
        New Ad
      </Text>
    </ScrollView>
  );
};
export default RewardHistory;
