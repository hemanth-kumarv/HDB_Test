import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  Image,
  View,
  Linking,
  ScrollView,
  RefreshControl,
} from "react-native";
import ErrorSVG from "../../assets/exclamation-triangle.svg";
import globalStyles from "../../globalStyles";
import SideDrawer from "../../Components/SideDrawer/sideDrawer";
import { styles } from "./AnalyticsDetailsStyles";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { getAnalyticsData } from "../Redux/dispatchers";
import DateTimePicker from "@react-native-community/datetimepicker";
import CompanyDailyAnalytics from "../CompanyAnalytics/CompanyDailyAnalytics";

export default ({ route, navigation }) => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const userName = useSelector((state) => state.UserId);
  const userAnalytics = useSelector((state) => state.AnalyticsData);
  const [dateDetails, setDateDetails] = useState({
    show: false,
    selected: new Date(),
  });

  const dateFormatter = (date) =>
    "".concat(date[2], " ", date[1], " ", date[3]);

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => dispatch(getAnalyticsData(userName))}
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
        {userAnalytics.status === !200 ? (
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
              onPress={() => dispatch(getAnalyticsData(userName))}
            >
              Retry
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Analytics</Text>
            <View style={styles.content}>
              <Text
                onPress={() => {
                  if (!dateDetails.show)
                    setDateDetails((obj) => ({ ...obj, show: true }));
                }}
                style={styles.date}
              >
                {dateFormatter(String(dateDetails.selected).split(" "))}
              </Text>
              <CompanyDailyAnalytics
                data={userAnalytics}
                currentDate={dateFormatter(
                  String(dateDetails.selected).split(" ")
                )}
              />
              {dateDetails.show && (
                <DateTimePicker
                  value={dateDetails.selected}
                  mode="date"
                  maximumDate={new Date()}
                  onChange={(e, date) => {
                    if (date)
                      setDateDetails((obj) => ({
                        ...obj,
                        show: false,
                        selected: date,
                      }));
                    else
                      setDateDetails((obj) => ({
                        ...obj,
                        show: false,
                      }));
                  }}
                />
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
