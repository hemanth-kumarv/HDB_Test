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
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { styles, adsTdWidth } from "./landingPageStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import BluetoothIcon from "../../assets/bluetooth.svg";
import { btConnection, sendData } from "../bluetoothConn";

const CustomerLandingPage = ({ route, navigation }) => {
  const [adsList, setAdsList] = useState([]);
  const [searching, setSearching] = useState(true);
  const [userName, setuserName] = useState(null);
  const [btData, setBtData] = useState({ status: 0, message: "" });
  const [btScanning, setBtScanning] = useState(true);
  const [showBtIcon, setShowBtIcon] = useState(true);
  const [transmitterID, setTransmitterID] = useState("");

  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const searchAvailableAds = (TransmitterID) => {
    // console.log("searching...");

    if (btData.status === 200) {
      setSearching(false);
      axios.then((server) =>
        server
          .post("/getAvailableAds", { tID: TransmitterID })
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
    } else bluetoothConnect();
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }
    (async () => {
      const name = await AsyncStorage.getItem("UserId");
      const totalRewards = await AsyncStorage.getItem("TotalRewards");
      setuserName(name);
      if (!totalRewards)
        axios.then((server) =>
          server
            .post("/getRewards", { name: name })
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
  }, [isFocused]);

  const bluetoothConnect = async () => {
    if (btData.status !== 200) {
      setBtScanning(true);
      let res = await btConnection("raspberrypi", setTransmitterID);
      setBtData(res);
      if (res.status === 200) {
        let res2 = await sendData("_init;TID", userName);
        setBtData(res2);
        setTimeout(() => setShowBtIcon(false), 5000);
      }
      setBtScanning(false);
    }
  };

  useEffect(() => {
    bluetoothConnect();
  }, []);

  useEffect(() => {
    console.log(transmitterID);
    if (transmitterID) searchAvailableAds(transmitterID);
  }, [transmitterID]);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => searchAvailableAds(transmitterID)}
          enabled={searching && !btScanning}
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
        {searching && !btScanning ? (
          <>
            <Text style={styles.heading}>Ads Near Me</Text>
            {typeof adsList === "string" || btData.status !== 200 ? (
              <View style={styles.errorTextContainer}>
                <ErrorSVG
                  width="50"
                  height="50"
                  style={{
                    tintColor: "yellow",
                  }}
                />
                <Text style={styles.errorText}>
                  {typeof adsList === "string" ? adsList : ""}
                  {"\n"}
                  {btData.status !== 200 ? btData.message : ""}
                </Text>
                <Text
                  style={styles.retryButton}
                  onPress={() => searchAvailableAds(transmitterID)}
                >
                  Retry
                </Text>
              </View>
            ) : (
              <ScrollView style={styles.table}>
                {adsList.map((i, j) => (
                  <TouchableOpacity
                    style={styles.adTableRow}
                    key={j}
                    onPress={async () => {
                      let res = await sendData(i.VideoID, userName);
                      if (res.status !== 200) setShowBtIcon(true);
                      setBtData(res);
                    }}
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
      <View style={styles.btIcon}>
        {btScanning ? null : (
          <BluetoothIcon
            width="40"
            height="40"
            style={[
              btData.status !== 200 ? { color: "red" } : { color: "#0A3D91" },
              showBtIcon ? { display: "flex" } : { display: "none" },
            ]}
            onPress={async () => {
              await bluetoothConnect();
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default CustomerLandingPage;
