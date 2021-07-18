import axios from "../axiosServer";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
  RefreshControl,
} from "react-native";
import globalStyles from "../../globalStyles";
import SideDrawer from "../SideDrawer/sideDrawer";
import { styles, adsTdWidth } from "./adQueueStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import { useIsFocused } from "@react-navigation/core";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { btConnection, sendData } from "../bluetoothConn";
import ArrowIcon from "../../assets/chevron-right.svg";

const AdQueuePage = ({ route, navigation }) => {
  const drawerOpen = useSelector((state) => state.drawerOpen);
  // const name = useSelector((state) => state.loggedIn);
  const isFocused = useIsFocused();

  const [adList, updateList] = useState([]);
  const [btData, setBtData] = useState({ status: 200, message: "" });
  const [intervals, createInterval] = useState({});
  const [sentData, updateSentData] = useState({
    Started: false,
    Sent: 0,
    Completed: 0,
    Time: [],
  });
  const sentDataRef = useRef(sentData);
  const [widthStyle, setWidthStyle] = useState({});
  const [stopQueue, setStopQueue] = useState({ stop: false, showAlert: false });

  const userName = useSelector((state) => state.UserId);
  const receivedBTData = useSelector((state) => state.receivedBTData);
  const dispatch = useDispatch();
  // const isFocused = useIsFocused();

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
    } else {
      setBtScanning(true);
      setTransmitterID({ ...transmitterID, searching: true });
      let res = await sendData("_init;TID", userName);
      if (res.status !== 200) setShowBtIcon(true);
      setBtData(res);
      setBtScanning(false);
    }
  };

  useEffect(() => {
    // console.log(receivedBTData, sentData, adList[sentData.Completed]);
    if (receivedBTData.includes("displayed")) {
      clearInterval(intervals[sentData.Completed]);
      setWidthStyle((obj) => ({
        ...obj,
        [sentData.Completed]: 100,
      }));
      updateSentData((obj) => {
        sentDataRef.current = { ...obj, Completed: obj.Completed + 1 };
        return { ...obj, Completed: obj.Completed + 1 };
      });
    }
    if (receivedBTData.includes("starting")) {
      updateSentData((obj) => {
        let now = Number(Date.now());
        sentDataRef.current = { ...obj, Time: [].concat([...obj.Time], [now]) };
        createInterval({
          [sentData.Completed]: setInterval(() => {
            let percent = Math.min(
              (Number(Date.now()) - Number(now)) /
                (Number(adList[sentData.Completed].Duration) * 10),
              100
            );
            setWidthStyle((obj) => ({
              ...obj,
              [sentData.Completed]: percent,
            }));
          }, 500),
        });
        return { ...obj, Time: [].concat([...obj.Time], [now]) };
      });
    }
  }, [receivedBTData]);

  useEffect(() => {
    if (route.params?.adsList)
      updateList(
        route.params?.adsList.filter((obj) =>
          route.params?.adQueue.List.map((i) => i.VideoID).includes(obj.VideoID)
        )
      );
  }, []);

  useEffect(() => {
    if (sentData.Started && !stopQueue.stop && sentData.Sent < adList.length)
      sendData(adList[sentData.Sent].VideoID, userName).then((res) => {
        setBtData(res);
        updateSentData((obj) => {
          sentDataRef.current = { ...obj, Sent: obj.Sent + 1 };
          return { ...obj, Sent: obj.Sent + 1 };
        });
      });
    else {
      if (sentData.Started) {
        setStopQueue((obj) => ({ ...obj, stop: true }));
        navigation.navigate("CustomerLandingPage", {
          displayCount: sentData.Completed,
          reward: adList
            .filter((ob, i) => i < sentData.Completed)
            .reduce((acc, obj) => Number(acc + Number(obj.Reward)), 0),
        });
      }
      updateSentData((obj) => {
        sentDataRef.current = { ...obj, Started: false };
        return { ...obj, Started: false };
      });
    }
  }, [sentData.Started, sentData.Completed]);

  useEffect(() => {
    if (stopQueue.showAlert)
      Alert.alert(
        "Stop Display",
        "Are you sure you want to stop displaying? The display will stop after the current ad has completed, and you will receive the rewards only for the ads displayed.",
        [
          {
            text: "Cancel",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => setStopQueue({ showAlert: false, stop: true }),
          },
        ]
      );
  }, [stopQueue.showAlert]);

  const backhandler = () => {
    if (!sentDataRef.current.Started) return false;
    else {
      setStopQueue((obj) => ({ ...obj, showAlert: true }));
      return true;
    }
  };
  useEffect(() => {
    sentDataRef.current = { Started: false, Sent: 0, Completed: 0, Time: [] };
    BackHandler.addEventListener("hardwareBackPress", backhandler);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backhandler);
  }, [isFocused]);

  return (
    <View
      style={globalStyles.container}
      // contentContainerStyle={globalStyles.containerContent}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={false}
      //     onRefresh={() => retrieveRewards(userName)}
      //   />
      // }
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
        <Text style={styles.heading}>Queued Ads</Text>
        <ProfileIconPage navigation={navigation} route={route} />
        <ScrollView style={styles.table}>
          {adList.length
            ? adList.map((item, j) => (
                <View key={j} style={{ width: "100%" }}>
                  {/* {sentData.Started ? ( */}
                  <View
                    style={{
                      position: "absolute",
                      maxWidth: "76%",
                      width: widthStyle[j] ? widthStyle[j] + "%" : 0,
                      height: 10,
                      backgroundColor: "lime",
                      left: 40,
                      top: 45,
                    }}
                  />
                  {/* ) : null} */}
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      opacity: sentData.Started ? 0.3 : 1,
                    }}
                    pointerEvents={sentData.Started ? "none" : "auto"}
                  >
                    <ArrowIcon
                      height="35"
                      width="30"
                      style={{
                        tintColor: "lightgreen",
                        transform: [{ rotate: "270deg" }],
                        alignSelf: "center",
                        opacity: j === 0 ? 0.3 : 1,
                      }}
                      onPress={() => {
                        if (j !== 0) {
                          let arr = [...adList];
                          [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                          updateList(arr);
                        }
                      }}
                    />
                    <View style={styles.adTableRow}>
                      {/* <Text style={[styles.adTableData, adsTdWidth.no]}>
                      {j + 1}
                    </Text> */}
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: item.Icon }}
                      />
                      <Text
                        style={[styles.adTableData, adsTdWidth.ad]}
                        numberOfLines={1}
                        ellipsizeMode="middle"
                        onPress={() => console.log("YO")}
                      >
                        {item.Name}
                      </Text>
                      <Text style={[styles.adTableData, adsTdWidth.reward]}>
                        Rs. {item.Reward}
                        {"\n"}
                        <Text style={{ fontSize: 16, color: "white" }}>
                          For {item.Duration} s
                        </Text>
                      </Text>
                    </View>
                    {/* <Text style={[styles.adTableData, adsTdWidth.select, {backgroundColor: 'dodgerblue', color: 'black'}]}>
                      Select
                    </Text> */}
                    <ArrowIcon
                      height="35"
                      width="30"
                      style={{
                        tintColor: "red",
                        transform: [{ rotate: "90deg" }],
                        alignSelf: "center",
                        opacity: j === adList.length - 1 ? 0.3 : 1,
                      }}
                      onPress={() => {
                        if (j !== adList.length - 1) {
                          let arr = [...adList];
                          [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
                          updateList(arr);
                        }
                      }}
                    />
                  </View>
                </View>
              ))
            : null}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[
          styles.adQueueBar,
          sentData.Started ? { backgroundColor: "red" } : {},
        ]}
        onPress={async () =>
          updateSentData((obj) => {
            sentDataRef.current = { ...obj, Started: true };
            return { ...obj, Started: true };
          })
        }
      >
        {sentData.Started ? (
          <Text
            style={styles.adQueueText}
            onPress={() => setStopQueue((obj) => ({ ...obj, showAlert: true }))}
          >
            Stop Displaying
          </Text>
        ) : (
          <>
            <Text style={styles.adQueueText}>
              Click to display {route.params?.adQueue.Count} ads.
            </Text>
            <Text style={styles.adQueueText}>
              Rs. {route.params?.adQueue.Amount} for{" "}
              {parseInt(route.params?.adQueue.Time / 60)} min{" "}
              {parseInt(route.params?.adQueue.Time % 60)} sec
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default AdQueuePage;
