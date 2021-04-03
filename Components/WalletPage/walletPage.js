import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles, txnTableStyles } from "./walletPageStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideDrawer from "../SideDrawer/sideDrawer";
import { useIsFocused } from "@react-navigation/core";
import axios from "../axiosServer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import ProfileIcon from "../../assets/person-circle.svg";

const WalletPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const [transactions, setTransactions] = useState([]);
  const [totalRewards, setTotalRewards] = useState({});
  const [userID, setUserID] = useState({});
  const dispatch = useDispatch();

  const getTransactions = (email) => {
    axios.then((server) =>
      server
        .post("/getPreviousTransactions", { email: email })
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }
    (async () => {
      var totalRewardsJSON = await AsyncStorage.getItem("TotalRewards");
      setTotalRewards(JSON.parse(totalRewardsJSON));

      var userId = await AsyncStorage.getItem("UserId");
      setUserID(userId);
      getTransactions(userId);
    })();
  }, [isFocused]);
  return (
    <View
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      onStartShouldSetResponder={() => {
        if (drawerOpen) dispatch(changeDrawerStyle(false));
      }}
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
        <Text style={styles.heading}>Wallet</Text>
        <ProfileIconPage navigation={navigation} route={route} />
        {transactions.length === 0 ? (
          <View style={{ top: 250 }}>
            <ActivityIndicator size={75} color="#fff" />
          </View>
        ) : (
          <View style={{ top: "14%" }}>
            <ScrollView
              scrollEnabled={false}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  progressViewOffset={-30}
                  onRefresh={() => getTransactions(userID)}
                />
              }
            >
              <Text
                style={styles.walletBalance}
                onPress={() => {
                  navigation.navigate("RewardHistory");
                }}
              >
                <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                  Total Balance {"\n\n"}
                </Text>
                <Text>
                  Rs. {totalRewards.Amount - transactions.TotalAmount}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontStyle: "italic",
                    textAlignVertical: "bottom",
                  }}
                >
                  {"\n\n"}
                  Click to view Reward History
                </Text>
              </Text>
              <Text style={styles.depositButton}>Transfer</Text>
            </ScrollView>
            <View style={styles.transactions}>
              <Text style={styles.prevTransactions}>Previous Transactions</Text>
              <ScrollView style={{ height: "52%" }}>
                {[0, 1, 2].map((k) =>
                  transactions.TransactionHistory.map((i, j) => {
                    return (
                      <View style={txnTableStyles.Row} key={j}>
                        <Text style={txnTableStyles.TxnId}>ID: {i.TxnId}</Text>
                        <Text style={txnTableStyles.Amount}>
                          Rs. {i.Amount}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={txnTableStyles.Date}>{i.Date}</Text>
                          <View
                            style={[
                              globalStyles.verticalLine,
                              { marginLeft: 3, marginRight: 3, borderWidth: 1 },
                            ]}
                          ></View>
                          <Text style={txnTableStyles.Time}>
                            {[i.Time.slice(0, 2), ":", i.Time.slice(2)].join(
                              ""
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                )}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletPage;
