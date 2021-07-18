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
import { Picker } from "@react-native-picker/picker";
import TimeSlotAnalytics from "../CompanyAnalytics/TimeSlotAnalytics";

export default ({ route, navigation }) => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const userName = useSelector((state) => state.UserId);
  const userAnalytics = useSelector((state) => state.AnalyticsData);
  const [chartData, setChartData] = useState([]);
  const [dateDetails, setDateDetails] = useState({
    show: false,
    selected: new Date(),
  });
  const [location, setLocation] = useState("All");
  const [currentAd, setCurrentAd] = useState(0);

  const dateFormatter = (date) =>
    "".concat(date[2], " ", date[1], " ", date[3]);

  const colors = [
    "#18B9DF",
    "#B078E2",
    "#8CFB76",
    "#EC02EA",
    "#EFB746",
    "#E32350",
    "#536A65",
    "#63F0D9",
    "#FD4254",
  ];
  useEffect(() => {
    if (Object.keys(userAnalytics).length) {
      let newdata = userAnalytics.Data.DailyData.filter(
        (obj) =>
          obj.Date === dateFormatter(String(dateDetails.selected).split(" "))
      );
      console.log(newdata);
      let newChartData = [],
        index = 0;
      if (newdata.length) {
        newdata[0].Details.forEach((ad) => {
          console.log(ad);
          ad.Count.forEach((zone) => {
            if (zone.Location === location || location === "All")
              newChartData.push({
                index: index,
                name: ad.AdTitle + "\n" + zone.Location,
                count: zone.TotalCount,
                color: colors[index++],
                legendFontColor: "#9F9F9F",
                legendFontSize: 15,
                timeSlots: zone.TimeSlots,
              });
          });
        });
      }
      setCurrentAd(0);
      setChartData(newChartData);
    }
  }, [location, dateDetails.selected]);
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View style={styles.dropdownPicker}>
                  <Picker
                    selectedValue={location}
                    style={{ color: "#fff" }}
                    onValueChange={(itemValue) => setLocation(itemValue)}
                    mode="dropdown"
                    dropdownIconColor="white"
                  >
                    <Picker.Item label="All Locations" value="All" />
                    <Picker.Item label="Koramangala" value="Koramangala" />
                    <Picker.Item label="Adugodi" value="Adugodi" />
                  </Picker>
                </View>
                <Text
                  onPress={() => {
                    if (!dateDetails.show)
                      setDateDetails((obj) => ({ ...obj, show: true }));
                  }}
                  style={styles.date}
                >
                  {dateFormatter(String(dateDetails.selected).split(" "))}
                </Text>
              </View>
              {chartData.length ? (
                <View style={styles.chartsContainer}>
                  <CompanyDailyAnalytics
                    chartData={chartData}
                    setCurrentAd={(id) => setCurrentAd(id)}
                    currentAd={currentAd}
                  />
                  <View style={styles.horizontalLine} />
                  <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
                    {chartData[currentAd].name.replace("\n", " (")}) -{" "}
                    {chartData[currentAd].count} ads.
                  </Text>
                  <TimeSlotAnalytics
                    chartData={chartData}
                    currentAd={currentAd}
                  />
                </View>
              ) : (
                <Text style={styles.filterErrorText}>
                  No ads were displayed for the above filters.
                </Text>
              )}

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
