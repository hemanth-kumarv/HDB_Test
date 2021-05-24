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
import AddressIcon from "../../assets/house.svg";
import EmailIcon from "../../assets/envelope.svg";
import DoBIcon from "../../assets/calendar.svg";
import PhoneIcon from "../../assets/telephone.svg";
import EditIcon from "../../assets/pencil.svg";

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
        axios.then((server) =>
          server
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
            })
        );
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
      <View
        style={[
          globalStyles.container,
          drawerOpen ? { opacity: 0.2 } : { opacity: 1 },
        ]}
        onStartShouldSetResponder={() => {
          if (drawerOpen) dispatch(changeDrawerStyle(false));
        }}
      >
        <Text style={styles.heading}>Profile</Text>
        <EditIcon width={30} height={30} style={styles.editIcon} />
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
              <Text style={profileDataStyles.email}>
                <EmailIcon
                  width={18}
                  height={18}
                  style={{ tintColor: "white" }}
                />
                {"\t"}
                {userData.Email}
              </Text>
              <Text style={profileDataStyles.email}>
                <PhoneIcon
                  width={18}
                  height={18}
                  style={{ tintColor: "white" }}
                />
                {"\t"}
                {userData.MobileNumber}
              </Text>
              <View style={styles.totalRewards}>
                <Text style={profileDataStyles.total}>
                  Total Time{"\n"}
                  {parseInt(totalRewards.Time / 60)} min{" "}
                  {parseInt(totalRewards.Time % 60)} sec
                </Text>
                <View style={globalStyles.verticalLine}></View>
                <Text style={profileDataStyles.total}>
                  Total Rewards{"\n"}Rs. {totalRewards.Amount}
                </Text>
              </View>
              <Text style={profileDataStyles.dob}>
                <DoBIcon
                  width={22}
                  height={22}
                  style={{ tintColor: "white" }}
                />
                {"\t"}
                <Text>{userData.DoB}</Text>
              </Text>
              <Text style={profileDataStyles.addr1}>
                <AddressIcon
                  width={22}
                  height={22}
                  style={{ tintColor: "white" }}
                />
                {"\t"}{" "}
                <Text>
                  {userData.Address1}
                  {"\n"}
                  {userData.Address2}
                </Text>
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
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
