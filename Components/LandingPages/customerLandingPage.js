import axios from "../axiosServer";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { styles, adsTdWidth } from "./landingPageStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";

const CustomerLandingPage = ({ route, navigation }) => {
  const [adsList, setAdsList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [userName, setuserName] = useState(null);

  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const searchAvailableAds = (userName) => {
    // console.log("searching...");

    setSearching(false);
    axios.then((server) =>
      server
        .post("/getAvailableAds", {})
        .then(async (res) => {
          // console.log("NEW USER: ", await AsyncStorage.getItem("UserId"));
          setAdsList(res.data);
          setSearching(true);
        })
        .catch((err) => {
          setAdsList("Error connecting to server.");
          setSearching(true);
        })
    );
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }
    if (adsList.length === 0 && !searching) {
      (async () => {
        const name = await AsyncStorage.getItem("UserId");
        const totalRewards = await AsyncStorage.getItem("TotalRewards");
        setuserName(name);
        searchAvailableAds(userName);
        if (totalRewards.length == 0)
          axios.then((server) =>
            server
              .post("/getRewards", { name: userDataJSON.Email })
              .then(async (res) => {
                await AsyncStorage.setItem(
                  "TotalRewards",
                  JSON.stringify(res.data.Total)
                );
              })
              .catch((err) => {
                console.log(err);
              })
          );
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
          onRefresh={() => searchAvailableAds(userName)}
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
        <ProfileIconPage navigation={navigation} route={route} />
        {searching ? (
          <>
            <Text style={styles.heading}>Ads Near Me</Text>
            {typeof adsList === "string" ? (
              <View style={styles.errorTextContainer}>
                <ErrorSVG
                  width="50"
                  height="50"
                  style={{
                    tintColor: "yellow",
                  }}
                />
                <Text style={styles.errorText}>{adsList}</Text>
                <Text
                  style={styles.retryButton}
                  onPress={() => searchAvailableAds(userName)}
                >
                  Retry
                </Text>
              </View>
            ) : (
              <ScrollView style={styles.table}>
                {adsList.map((i, j) => (
                  <View style={styles.adTableRow} key={j}>
                    {/* <Text style={[styles.adTableData, adsTdWidth.no]}>{j + 1}</Text> */}
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={{ uri: i.Icon }}
                    />
                    <Text style={[styles.adTableData, adsTdWidth.ad]}>
                      {i.Name}
                    </Text>
                    <Text style={[styles.adTableData, adsTdWidth.reward]}>
                      Rs. {i.Reward}
                      {"\n"}
                      <Text style={{ fontSize: 18, color: "white" }}>
                        For {i.Duration} s
                      </Text>
                    </Text>
                    {/* <Text style={[styles.adTableData, adsTdWidth.select, {backgroundColor: 'dodgerblue', color: 'black'}]}>
                      Select
                    </Text> */}
                  </View>
                ))}
              </ScrollView>
            )}
          </>
        ) : (
          <View style={{ top: 250 }}>
            <ActivityIndicator size={75} color="#fff" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default CustomerLandingPage;
