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
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { styles } from "./companyLandingStyles";
import { adsTdWidth } from "./landingPageStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";

const CompanyLandingPage = ({ route, navigation }) => {
  const [searching, setSearching] = useState(true);
  const [userName, setuserName] = useState(null);
  const [adsList, setAdsList] = useState([]);

  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const searchPreviousAds = (name) => {
    setSearching(false);
    axios.then((server) =>
      server
        .post("/getPreviouslyUploadedAds", { emailID: name })
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
    (async () => {
      const name = await AsyncStorage.getItem("UserId");
      setuserName(name);
      if (name) searchPreviousAds(name);
    })();
  }, [isFocused]);

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
            <Text style={styles.heading}>Upload Ad</Text>
            <View style={styles.table}>
              <Text style={styles.button}>Upload New Ad</Text>
              <View style={{ padding: 15, top: 15 }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>
                  Previously Uploaded Ads
                </Text>
                <ScrollView style={styles.prevAds}>
                  {adsList.length ? (
                    adsList.map((i, j) => (
                      <TouchableOpacity
                        style={styles.adTableRow}
                        key={j}
                        onPress={async () =>
                          await Linking.openURL(
                            "https://drive.google.com/file/d/"+i.VideoID+"/view?usp=sharing"
                          )
                        }
                      >
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
