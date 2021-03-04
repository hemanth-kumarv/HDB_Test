import axios from "axios";
import { Title } from "native-base";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import { styles, tdWidth } from "./landingPageStyles";
import config from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";

const timeFormatter = time => {
  let timeFormat =
    String(time.Time).slice(0, 2) + ":" + String(time.Time).slice(2);
  let newtime =
    time.Date + "/" + time.Month + "/" + time.Year + "\n" + timeFormat;
  return newtime;
};

const totalFinder = (arr, name) => {
  let total = 0;
  arr.forEach(i => {
    total += i[name];
  });
  return total;
};

const CustomerLandingPage = ({ navigation }) => {
  const [rewardsList, setRewardsList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [userName, setuserName] = useState(null);

  const drawerOpen = useSelector(state => state.drawerOpen);

  const serverIP =
    config.ExpressServer.ServerIP + ":" + String(config.ExpressServer.Port);
  const retrieveRewards = userName => {
    console.log("searching...");

    setSearching(false);
    axios
      .post(
        serverIP + "/getRewards",
        {},
        { params: { name: userName }, timeout: config.defaultTimeout }
      )
      .then(async res => {
        // console.log("NEW USER: ", await AsyncStorage.getItem("UserId"));
        setRewardsList(res.data);
        setSearching(true);
      })
      .catch(err => {
        console.error("YO ERROR BRO!", err);
        setRewardsList("Error connecting to server.");
        setSearching(true);
      });
  };
  useEffect(() => {
    if (rewardsList.length === 0 && !searching) {
      (async () => {
        const name = await AsyncStorage.getItem("UserId");
        console.log(name);
        setuserName(name);
        retrieveRewards(userName);
      })();
    }
  });
  return (
    <View style={globalStyles.container}>
      {searching ? (
        <>
          <SideDrawer navigation={navigation} />
          <View
            style={[
              styles.container,
              drawerOpen ? { opacity: 0.2 } : { opacity: 1 }
            ]}
          >
            <Text
              style={styles.heading}
              // onPress={async () => await setRewardsList(await getRewardsList())}
            >
              Reward Description
            </Text>
            {typeof rewardsList === "string" ? (
              <View style={styles.errorTextContainer}>
                <ErrorSVG
                  width="50"
                  height="50"
                  style={{
                    tintColor: "yellow"
                  }}
                />
                <Text style={styles.errorText}>{rewardsList}</Text>
                <Text
                  style={styles.retryButton}
                  onPress={() => {
                    console.log("HELLOOOO!");
                    // retrieveRewards(userName);
                  }}
                >
                  Retry again
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
                {rewardsList.map((i, j) => (
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
                    {totalFinder(rewardsList, "Reward")}
                  </Text>
                  <Text style={[styles.tableData, tdWidth.totalDuration]}>
                    {totalFinder(rewardsList, "Duration")}
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </>
      ) : (
        <View style={{ top: 250 }}>
          <ActivityIndicator size={75} color="#fff" />
        </View>
      )}
    </View>
  );
};
export default CustomerLandingPage;
