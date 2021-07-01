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
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { styles, adsTdWidth } from "./landingPageStyles";
import { changeDrawerStyle, setAsyncStorage } from "../Redux/dispatchers";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import CheckSVG from "../../assets/check2-circle.svg";
import UncheckSVG from "../../assets/circle.svg";
import BluetoothIcon from "../../assets/bluetooth.svg";
import { btConnection, sendData } from "../bluetoothConn";

const CustomerLandingPage = ({ route, navigation }) => {
  const [adsList, setAdsList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [btData, setBtData] = useState({ status: 0, message: "" });
  const [btScanning, setBtScanning] = useState(true);
  const [showBtIcon, setShowBtIcon] = useState(true);
  const [transmitterID, setTransmitterID] = useState({
    data: "",
    searching: false,
  });
  const [adQueue, updateAdQueue] = useState({
    Amount: 0,
    Time: 0,
    Count: 0,
    List: [],
  });

  const userName = useSelector((state) => state.UserId);
  const totalRewards = useSelector((state) => state.TotalRewards);
  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const searchAvailableAds = async (TransmitterID) => {
    if (btData.status === 200) {
      axios.then((server) =>
        server
          .post("/getAvailableAds", {
            tID: TransmitterID.data,
          })
          .then((res) => {
            setAdsList(res.data);
            setSearching(true);
          })
          .catch((err) => {
            console.log(err);
            setAdsList("Error connecting to server.");
            setSearching(true);
          })
      );
    } else bluetoothConnect();
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
      if (transmitterID.data) {
        setSearching(false);
        bluetoothConnect();
      }
      if (route.params?.displayCount) {
        Alert.alert(
          "Successfully displayed ads",
          "Successfully displayed " +
            route.params?.displayCount +
            " ads, from which you earned Rs. " +
            route.params?.reward +
            ".",
          [
            {
              text: "OK",
              onPress: () => null,
            },
          ]
        );
      }
      navigation.setParams({ displayCount: 0, reward: 0 });
    }
    if (!totalRewards)
      axios.then((server) =>
        server
          .post("/getRewards", { name: userName })
          .then(async (res) => {
            dispatch(
              setAsyncStorage([
                ["TotalRewards", JSON.stringify(res.data.Total)],
              ])
            );
          })
          .catch((err) => {
            console.log(err);
          })
      );
  }, [isFocused]);

  const bluetoothConnect = async () => {
    updateAdQueue({ Amount: 0, Time: 0, Count: 0, List: [] });
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
      setSearching(true);
    } else {
      setBtScanning(true);
      setTransmitterID({ ...transmitterID, searching: true });
      let res = await sendData("_init;TID", userName);
      if (res.status !== 200) {
        setShowBtIcon(true);
        setSearching(true);
      }
      setBtData(res);
      setBtScanning(false);
    }
  };

  const updateAdQueueData = (data, add) => {
    let newAdQueue = add
      ? {
          Amount: Number(adQueue.Amount + data.Reward),
          Time: Number(adQueue.Time + data.Duration),
          Count: adQueue.Count + 1,
          List: [
            ...adQueue.List,
            { VideoID: data.VideoID, TransmitterID: data.Transmitters },
          ],
        }
      : {
          Amount: Number(adQueue.Amount - data.Reward),
          Time: Number(adQueue.Time - data.Duration),
          Count: adQueue.Count - 1,
          List: [...adQueue.List].filter((i) => i.VideoID !== data.VideoID),
        };
    updateAdQueue(newAdQueue);
  };
  useEffect(() => {
    console.log(transmitterID);
    if (!transmitterID.searching)
      (async () => await searchAvailableAds(transmitterID))();
  }, [transmitterID]);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={async () => bluetoothConnect()}
          enabled={searching && !btScanning}
        />
      }
    >
      <SideDrawer navigation={navigation} route={route} />
      <View
        // pointerEvents={drawerOpen ? "none" : "auto"}
        style={[
          styles.container,
          drawerOpen ? { opacity: 0.2 } : { opacity: 1 },
        ]}
        onStartShouldSetResponder={() => {
          if (drawerOpen) dispatch(changeDrawerStyle(false));
        }}
      >
        <ProfileIconPage navigation={navigation} route={route} />
        {console.log(searching, !btScanning)}
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
                  onPress={async () => await bluetoothConnect()}
                >
                  Retry
                </Text>
              </View>
            ) : (
              <>
                <ScrollView
                  style={[
                    styles.table,
                    adQueue.Count
                      ? {
                          maxHeight: "78%",
                        }
                      : {
                          maxHeight: "86%",
                        },
                  ]}
                >
                  {adsList.map((i, j) => (
                    <View
                      key={j}
                      style={[
                        styles.adTableRow,
                        { backgroundColor: "transparent" },
                      ]}
                    >
                      {adQueue.Count ? (
                        adQueue.List.some((e) => e.VideoID === i.VideoID) ? (
                          <CheckSVG
                            height="30"
                            width="30"
                            style={{ tintColor: "lime", marginRight: 10 }}
                            onPress={() => updateAdQueueData(i, false)}
                          />
                        ) : (
                          <UncheckSVG
                            height="30"
                            width="30"
                            style={{ tintColor: "green", marginRight: 10 }}
                            onPress={() => updateAdQueueData(i, true)}
                          />
                        )
                      ) : null}
                      <TouchableOpacity
                        style={[
                          styles.adTableRow,
                          adQueue.Count ? { width: "85%" } : { width: "100%" },
                        ]}
                        onPress={async () => {
                          // let res = await sendData(i.VideoID, userName);
                          // if (res.status !== 200) setShowBtIcon(true);
                          // setBtData(res);
                          updateAdQueueData(
                            i,
                            !adQueue.List.some((e) => e.VideoID === i.VideoID)
                          );
                        }}
                      >
                        {/* <Text style={[styles.adTableData, adsTdWidth.no]}>{j + 1}</Text> */}
                        <Image
                          style={{ width: 60, height: 60 }}
                          source={{ uri: i.Icon }}
                        />
                        <Text
                          style={[styles.adTableData, adsTdWidth.ad]}
                          numberOfLines={1}
                          ellipsizeMode="middle"
                        >
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
                    </View>
                  ))}
                </ScrollView>
                {adQueue.Count ? (
                  <TouchableOpacity
                    style={styles.adQueueBar}
                    onPress={() =>
                      navigation.navigate("AdQueuePage", {
                        adQueue: adQueue,
                        adsList: adsList,
                      })
                    }
                  >
                    <Text style={styles.adQueueText}>
                      {adQueue.Count} ads queued.
                    </Text>
                    <Text style={styles.adQueueText}>
                      Rs. {adQueue.Amount} for {parseInt(adQueue.Time / 60)} min{" "}
                      {parseInt(adQueue.Time % 60)} sec
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </>
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
