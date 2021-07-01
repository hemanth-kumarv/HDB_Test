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
import SideDrawer from "../SideDrawer/sideDrawer";
import { useIsFocused } from "@react-navigation/core";
import axios from "../axiosServer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import ProfileIcon from "../../assets/person-circle.svg";

const WalletPage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState([]);

  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const userID = useSelector((state) => state.UserId);
  const totalRewards = useSelector((state) => state.TotalRewards);

  const timeFormatter = (time) => {
    let strArray = time.split(" ");
    return "".concat(
      strArray[2],
      " ",
      strArray[1],
      " ",
      strArray[4],
      "|",
      strArray[3]
    );
  };

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
    getTransactions(userID);
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
                  Rs.{" "}
                  {Math.round(
                    (totalRewards.Amount - transactions.TotalAmount) * 100
                  ) / 100}
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
                {transactions.TransactionHistory.map((i, j) => {
                  return (
                    <View style={txnTableStyles.Row} key={j}>
                      <Text style={txnTableStyles.TxnId}>ID: {i.TxnId}</Text>
                      <Text style={txnTableStyles.Amount}>Rs. {i.Amount}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={txnTableStyles.Date}>
                          {timeFormatter(i.DateTime)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletPage;
