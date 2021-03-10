import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles, profileDataStyles } from "./profilePageStyles";
import { changeDrawerStyle } from "../Redux/dispatchers";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideDrawer from "../SideDrawer/sideDrawer";
import { useIsFocused } from "@react-navigation/core";
import axios from "../axiosServer";
import ProfileIcon from "../../assets/person-circle.svg";

const ProfilePage = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const [userData, setUserData] = useState({});
  const [totalRewards, setTotalRewards] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      if (drawerOpen) dispatch(changeDrawerStyle(false));
    }

    (async () => {
      var userDataJSON = await AsyncStorage.getItem("UserData");
      if (userDataJSON !== null) {
        userDataJSON = JSON.parse(userDataJSON);
        userDataJSON.ProfilePicture = userDataJSON.ProfilePicture;
        setUserData(userDataJSON);
      }
      var totalRewardsJSON = await AsyncStorage.getItem("TotalRewards");
      if (totalRewardsJSON === null && userDataJSON !== null) {
        axios
          .post("/getRewards", { name: userDataJSON.Email })
          .then(async (res) => {
            await AsyncStorage.setItem(
              "TotalRewards",
              JSON.stringify(res.data.Total)
            );
            setTotalRewards(res.data.Total);
          })
          .catch((err) => {
            setTotalRewards({ Error: "Error connecting to server." });
            console.log(err);
          });
      } else setTotalRewards(JSON.parse(totalRewardsJSON));
    })();
  }, [isFocused]);
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      onStartShouldSetResponder={() => {
        if (drawerOpen) dispatch(changeDrawerStyle(false));
      }}
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={false}
      //       onRefresh={() => retrieveRewards(userName)}
      //     />
      //   }
    >
      <SideDrawer navigation={navigation} route={route} />
      <Text style={styles.heading}>Profile</Text>
      {Object.keys(userData).length > 0 &&
      totalRewards &&
      Object.keys(totalRewards).length > 0 ? (
        <View
          style={[
            globalStyles.container,
            {
              alignItems: "center",
              justifyContent: "space-around",
              top: "10%",
            },
          ]}
        >
          {userData["ProfilePicture"].length > 0 ? (
            <Image
              style={styles.profilePicture}
              source={{ uri: userData.ProfilePicture }}
              resizeMode="cover"
            />
          ) : (
            <ProfileIcon
              width={100}
              height={100}
              style={[
                styles.profilePicture,
                { tintColor: "white", margin: 25 },
              ]}
            />
          )}
          <ScrollView>
            <Text style={profileDataStyles.name}>{userData.Name}</Text>
            <Text style={profileDataStyles.email}>{userData.Email}</Text>
            <Text style={profileDataStyles.email}>{userData.MobileNumber}</Text>
            <View style={styles.totalRewards}>
              <Text style={profileDataStyles.total}>
                Total Time{"\n"}
                {totalRewards.Time} min
              </Text>
              <View
                style={{
                  height: "100%",
                  borderLeftColor: "white",
                  borderWidth: 2,
                }}
              ></View>
              <Text style={profileDataStyles.total}>
                Total Rewards{"\n"}Rs. {totalRewards.Amount}
              </Text>
            </View>
            <Text style={profileDataStyles.dob}>
              Date of Birth <Text>{userData.DoB}</Text>
            </Text>
            <Text style={profileDataStyles.addr1}>
              Address Line 1 <Text>{userData.Address1}</Text>
            </Text>
            <Text style={profileDataStyles.addr2}>
              Address Line 2 <Text>{userData.Address2}</Text>
            </Text>
          </ScrollView>
        </View>
      ) : (
        <View style={{ top: 250 }}>
          <ActivityIndicator size={75} color="#fff" />
        </View>
      )}
      <Text
        style={styles.logout}
        onPress={async () => {
          await AsyncStorage.removeItem("UserId");
          await AsyncStorage.removeItem("UserData");
          await AsyncStorage.removeItem("TotalRewards");

          navigation.replace("WelcomePage");
        }}
      >
        Logout
      </Text>
    </ScrollView>
  );
};

export default ProfilePage;
