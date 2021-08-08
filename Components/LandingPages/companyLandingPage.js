import axios from "../axiosServer";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Image,
  View,
  Linking,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { styles } from "./companyLandingStyles";
import { styles as landingStyles } from "./landingPageStyles";
import { adsTdWidth } from "./landingPageStyles";
import { changeDrawerStyle, getAnalyticsData } from "../Redux/dispatchers";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import CompanyAnalyticsGraph from "../CompanyAnalytics/CompanyAnalyticsGraph";

const CompanyLandingPage = ({ route, navigation }) => {
  const [searching, setSearching] = useState(false);
  // const [userName, setuserName] = useState(null);
  const [adsList, setAdsList] = useState([]);

  const drawerOpen = useSelector((state) => state.drawerOpen);
  const userName = useSelector((state) => state.UserId);
  const userAnalytics = useSelector((state) => state.AnalyticsData);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const searchPreviousAds = (name) => {
    setSearching(false);
    axios.then((server) =>
      server
        .post("/getPreviouslyUploadedAds", { emailID: name })
        .then(async (res) => {
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
    (async () => {
      // const name = await AsyncStorage.getItem("UserId");
      // setuserName(name);
      dispatch(getAnalyticsData(userName));
      searchPreviousAds(userName);
    })();
  }, [isFocused]);

  useEffect(() => {
    if (route.params?.adUploadMessage) {
      Alert.alert(
        "Note",
        route.params.adUploadMessage,
        [
          {
            text: "Okay",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      navigation.setParams({
        adUploadMessage: "",
      });
    }
  }, [route.params?.adUploadMessage]);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => searchPreviousAds(userName)}
          enabled={searching}
        />
      }
    >
      <SideDrawer navigation={navigation} route={route} />
      <View
        style={[
          landingStyles.container,
          drawerOpen ? { opacity: 0.2 } : { opacity: 1 },
        ]}
        onStartShouldSetResponder={() => {
          if (drawerOpen) dispatch(changeDrawerStyle(false));
        }}
      >
        <ProfileIconPage navigation={navigation} route={route} />
        {searching ? (
          <>
            {typeof adsList === "string" ? (
              <View style={landingStyles.errorTextContainer}>
                <ErrorSVG
                  width="50"
                  height="50"
                  style={{
                    tintColor: "yellow",
                  }}
                />
                <Text style={landingStyles.errorText}>{adsList}</Text>
                <Text
                  style={landingStyles.retryButton}
                  onPress={() => searchPreviousAds(userName)}
                >
                  Retry
                </Text>
              </View>
            ) : (
              <>
                <Text style={landingStyles.heading}>Upload Ad</Text>
                <View style={styles.table}>
                  <Text
                    style={styles.button}
                    onPress={() => navigation.navigate("NewAdPage")}
                  >
                    Upload New Ad
                  </Text>
                  <View style={{ padding: 15, top: 15 }}>
                    <Text style={{ color: "#fff", fontSize: 24 }}>
                      Previously Uploaded Ads
                    </Text>
                    <ScrollView style={styles.prevAds}>
                      {adsList.length ? (
                        adsList.map((i, j) => (
                          <TouchableOpacity
                            style={landingStyles.adTableRow}
                            key={j}
                            onPress={async () =>
                              await Linking.openURL(
                                "https://drive.google.com/file/d/" +
                                  i.VideoID +
                                  "/view?usp=sharing"
                              )
                            }
                          >
                            <Image
                              style={{ width: 60, height: 60 }}
                              source={{ uri: i.Icon }}
                            />
                            <Text
                              style={[landingStyles.adTableData, adsTdWidth.ad]}
                            >
                              {i.Name}
                            </Text>
                            <Text
                              style={[
                                landingStyles.adTableData,
                                adsTdWidth.reward,
                              ]}
                            >
                              Rs. {i.Reward}
                              {"\n"}
                              <Text style={{ fontSize: 18, color: "white" }}>
                                For {i.Duration} s
                              </Text>
                            </Text>
                            {/* <Text style={[styles.adTableData, adsTdWidth.select, {backgroundColor: 'dodgerblue', color: 'black'}]}>
                      Select
                            </Text> */}
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text style={styles.errorText}>
                          Please upload a New Ad first.
                        </Text>
                      )}
                    </ScrollView>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.analyticsGraph}
                  onPress={() => navigation.navigate("AnalyticsDetails")}
                >
                  <CompanyAnalyticsGraph
                    data={userAnalytics}
                    navigation={navigation}
                    route={route}
                  />
                </TouchableOpacity>
              </>
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
export default CompanyLandingPage;
