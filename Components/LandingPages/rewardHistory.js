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
import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import { useIsFocused } from "@react-navigation/core";
import ProfileIconPage from "../ProfilePage/profileIcon";

const timeFormatter = (time) => {
  let timeFormat =
    String(time.Time).slice(0, 2) + ":" + String(time.Time).slice(2);
  let newtime =
    time.Date + "/" + time.Month + "/" + time.Year + "\n" + timeFormat;
  return newtime;
};

const totalFinder = (arr, name) => {
  let total = 0;
  arr.forEach((i) => {
    total += i[name];
  });
  return total;
};

const RewardHistory = ({ route, navigation }) => {
  const [rewardsList, setRewardsList] = useState({});
  const [searching, setSearching] = useState(false);
  const [userName, setuserName] = useState(null);

  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const retrieveRewards = (userName) => {
    // console.log("searching...", userName);

    setSearching(false);
    axios
      .post("/getRewards", { name: userName })
      .then(async (res) => {
        // console.log("NEW USER: ", await AsyncStorage.getItem("UserId"));
        setRewardsList(res.data);
        await AsyncStorage.setItem(
          "TotalRewards",
          JSON.stringify(res.data.Total)
        );
        setSearching(true);
      })
      .catch((err) => {
        setRewardsList("Error connecting to server.");
        setSearching(true);
        console.log(err);
      });
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }
    if (Object.keys(rewardsList).length === 0 && !searching) {
      (async () => {
        const name = await AsyncStorage.getItem("UserId");
        setuserName(name);
        retrieveRewards(name);
      })();
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
              <ScrollView style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableData, tdWidth.no]}>No.</Text>
                  <Text style={[styles.tableData, tdWidth.date]}>
                    Date/{"\n"}Time
                  </Text>
                  <Text style={[styles.tableData, tdWidth.ad]}>
                    Ad{"\n"} Name
                  </Text>
                  <Text style={[styles.tableData, tdWidth.reward]}>
                    Reward{"\n"}(Rs.)
                  </Text>
                  <Text style={[styles.tableData, tdWidth.duration]}>
                    Duration{"\n"}(Mins)
                  </Text>
                </View>
                {rewardsList.Rewards.map((i, j) => (
                  <View style={styles.tableRow} key={j}>
                    <Text style={[styles.tableData, tdWidth.no]}>{j + 1}</Text>
                    <Text style={[styles.tableData, tdWidth.date]}>
                      {timeFormatter(i.DateTime)}
                    </Text>
                    <Text style={[styles.tableData, tdWidth.ad]}>
                      {i.AdName}
                    </Text>
                    <Text style={[styles.tableData, tdWidth.reward]}>
                      {i.Reward}
                    </Text>
                    <Text style={[styles.tableData, tdWidth.duration]}>
                      {i.Duration}
                    </Text>
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableData, tdWidth.total]}>Total</Text>
                  <Text style={[styles.tableData, tdWidth.totalRewards]}>
                    {rewardsList.Total.Amount}
                  </Text>
                  <Text style={[styles.tableData, tdWidth.totalDuration]}>
                    {rewardsList.Total.Time}
                  </Text>
                </View>
              </ScrollView>
            )}
          </>
        ) : (
          <View style={{ top: 250 }}>
            <ActivityIndicator size={75} color="#fff" />
          </View>
        )}
        <Text
          style={styles.newAd}
          onPress={() => navigation.navigate("CustomerLandingPage")}
        >
          New Ad
        </Text>
      </View>
    </ScrollView>
  );
};
export default RewardHistory;
