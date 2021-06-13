import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./newAdPageStyles";
import globalStyles from "../../globalStyles";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector, useDispatch } from "react-redux";
import RNFS from "react-native-fs";
import config from "../config.json";
import DateTimePicker from "@react-native-community/datetimepicker";
import SideDrawer from "../SideDrawer/sideDrawer";
import ProfileIconPage from "../ProfilePage/profileIcon";
import { changeDrawerStyle } from "../Redux/dispatchers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axiosServer";

const NewAdPage = ({ navigation, route }) => {
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const dispatch = useDispatch();
  const [pickerData, setPickerData] = useState({
    fromTime: { show: false, data: "From Time", active: true },
    toTime: { show: false, data: "To Time", active: true },
    displayDate: { show: false, data: "Select Date", active: true },
  });
  const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState({
    AdLocation: { data: "Choose", active: true },
    AdTitle: { data: "", active: true },
    DisplayCount: { data: "", active: true },
  });
  const [videoDetails, setVideoDetails] = useState({ data: "", duration: 0 });

  const updateFields = (name, data) => {
    setFormData({ ...formData, [name]: { data: data, active: false } });
  };

  const validateStyle = (field, name, defaultName) => {
    return {
      borderBottomColor: field[name].active
        ? "gray"
        : field[name].data !== defaultName
        ? "gray"
        : "red",
    };
  };

  const checkFormData = () => {
    let valid = true;
    let newPickerData = {};
    for (let x in pickerData) {
      if (pickerData[x].active) {
        valid = false;
        newPickerData = {
          ...newPickerData,
          [x]: { ...pickerData[x], active: false },
        };
      } else newPickerData = { ...newPickerData, [x]: pickerData[x] };
    }
    setPickerData(newPickerData);
    if (pickerData.fromTime.data === "From Time") valid = false;
    if (pickerData.toTime.data === "To Time") valid = false;
    if (pickerData.displayDate.data === "Select Date") valid = false;

    let newFormData = {};
    for (let x in formData) {
      if (formData[x].active) {
        valid = false;
        newFormData = {
          ...newFormData,
          [x]: { ...formData[x], active: false },
        };
      } else newFormData = { ...newFormData, [x]: formData[x] };
      if (!formData[x].data) valid = false;
    }
    setFormData(newFormData);
    if (formData.AdLocation === "Choose") valid = false;
    // if(!videoDetails.data) {setErrorText("Please choose a video to upload."); return false;}
    if (!valid) setErrorText("Please fill the mandatory fields.");
    return valid;
  };

  const uploadToServer = async (data) => {
    // console.log(data);
    let fieldsData = Object.fromEntries(
      Object.entries(data).map(([k, v], i) => [k, v.data])
    );
    Object.keys(data).map((i) => data[i].data);
    // console.log(fieldsData);
    let fileName = Date.now() + "-" + fieldsData.AdTitle + ".mp4";
    let name = await AsyncStorage.getItem("UserId");
    fieldsData["fileName"] = fileName;
    fieldsData["userID"] = name;
    let uploadUrl =
      config.ExpressServer.ServerIP +
      ":" +
      String(config.ExpressServer.Port) +
      "/uploadNewAd";
    let files = [
      {
        name: "MyNewVideo",
        filename: fileName,
        filepath: data.video.data,
      },
    ];
    let valid = checkFormData();
    if (valid) {
      if (videoDetails.data)
        await RNFS.uploadFiles({
          toUrl: uploadUrl,
          files: files,
          method: "POST",
          headers: {
            Accept: "application/json",
            Connection: "close",
          },
          fields: fieldsData,
        })
          .promise.then((response) => {
            let res = JSON.parse(response.body);
            if (res.status === 200) {
              navigation.navigate("CompanyLandingPage", {
                adUploadMessage: res.message,
              });
            } else {
              console.log("SERVER ERROR");
              setErrorText("SERVER ERROR");
            }
          })
          .catch((err) => console.log(err));
      else {
        axios.then((server) =>
          server
            .post("/uploadNewAd", fieldsData)
            .then(async (res) => {
              navigation.navigate("CompanyLandingPage", {
                adUploadMessage:
                  "If you wish to upload the ad through email, please do mention the Ad Title, as well as the registered Email ID and send within 48 hours.",
              });
            })
            .catch((err) => {
              setErrorText("Error connecting to server.");
            })
        );
      }
    }
  };

  const PickerUI = (params) => (
    <>
      <Text
        onPress={() => {
          if (!pickerData[params.fieldName].show)
            setPickerData({
              ...pickerData,
              [params.fieldName]: {
                ...pickerData[params.fieldName],
                show: true,
              },
            });
        }}
        style={[
          styles.textInput,
          params.style,
          pickerData[params.fieldName].data !== params.defaultName
            ? null
            : { color: "gray" },
          validateStyle(pickerData, params.fieldName, params.defaultName),
        ]}
      >
        {pickerData[params.fieldName].data === params.defaultName
          ? params.defaultName
          : params.format(pickerData[params.fieldName].data)}
      </Text>
      {pickerData[params.fieldName].show ? (
        <DateTimePicker
          style={[styles.textInput]}
          minimumDate={new Date()}
          value={new Date()}
          mode={params.pickerType}
          onChange={(e, date) => {
            setPickerData({
              ...pickerData,
              [params.fieldName]: {
                data: date ? String(date) : params.defaultName,
                show: false,
                active: false,
              },
            });
          }}
        />
      ) : null}
    </>
  );

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
      onStartShouldSetResponder={() => {
        if (drawerOpen) dispatch(changeDrawerStyle(false));
      }}
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
        <Text style={styles.heading}>Upload Ad</Text>
        <ProfileIconPage navigation={navigation} route={route} />
        <View style={styles.form}>
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          <View
            style={[
              styles.dropdownPicker,
              validateStyle(formData, "AdLocation", "Choose"),
            ]}
          >
            <Picker
              selectedValue={formData.AdLocation.data}
              style={{ color: "#fff" }}
              onValueChange={(itemValue, itemIndex) =>
                updateFields("AdLocation", itemValue)
              }
              mode="dropdown"
              dropdownIconColor="white"
            >
              <Picker.Item
                label="Ad Location"
                value="Choose"
                itemStyle={{ color: "gray" }}
              />
              <Picker.Item label="KML" value="KML" />
              <Picker.Item label="Adugodi" value="Adugodi" />
              <Picker.Item label="Jayanagar" value="Jayanagar" />
            </Picker>
          </View>
          <TextInput
            style={[styles.textInput, validateStyle(formData, "AdTitle", "")]}
            placeholder="Ad Title"
            placeholderTextColor="#aaaa"
            value={formData.AdTitle.data}
            onChangeText={(text) => updateFields("AdTitle", text)}
            onBlur={() => updateFields("AdTitle", formData.AdTitle.data)}
          />
          {PickerUI({
            fieldName: "displayDate",
            defaultName: "Select Date",
            pickerType: "date",
            format: (date) => date.split(" ").slice(1, 4).join(" "),
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "85%",
              alignSelf: "center",
            }}
          >
            {PickerUI({
              fieldName: "fromTime",
              defaultName: "From Time",
              pickerType: "time",
              style: { width: "30%" },
              format: (date) =>
                date.split(" ")[4].split(":").slice(0, 2).join(":"),
            })}
            <Text style={{ color: "white" }}>to</Text>
            {PickerUI({
              fieldName: "toTime",
              defaultName: "To Time",
              pickerType: "time",
              style: { width: "30%" },
              format: (date) =>
                date.split(" ")[4].split(":").slice(0, 2).join(":"),
            })}
          </View>
          <TextInput
            style={[
              styles.textInput,
              validateStyle(formData, "DisplayCount", ""),
            ]}
            placeholder="Displays per Day"
            keyboardType="number-pad"
            placeholderTextColor="#aaaa"
            value={formData.DisplayCount.data}
            onChangeText={(text) => updateFields("DisplayCount", text)}
            onBlur={() =>
              updateFields("DisplayCount", formData.DisplayCount.data)
            }
          />
          <Text
            style={styles.selectAdButton}
            onPress={() => {
              ImagePicker.openPicker({ mediaType: "video" }).then(
                async (video) => {
                  console.log(video);
                  setVideoDetails({
                    data: video.path.split("file://")[1],
                    duration: Math.round(Number(video.duration) / 100) / 10,
                  });
                  // uploadToServer(video);
                  // var img = await RNFS.readFile(image.path, "base64");
                  // setPickedImage("data:" + image.mime + ";base64," + img);
                }
              );
            }}
          >
            Select Ad
          </Text>
          <Text
            style={{ color: "lightgray", textAlign: "center", marginTop: 10 }}
          >
            ( Or Mail us the video to vauntedtest@gmail.com )
          </Text>
          {videoDetails.data ? (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                marginTop: 20,
                fontSize: 20,
              }}
            >
              You selected: {String(videoDetails.data.split("/").pop())} (
              {videoDetails.duration} s)
            </Text>
          ) : null}
          <Text
            style={{
              position: "absolute",
              bottom: "10%",
              color: "white",
              fontSize: 22,
              alignSelf: "center",
            }}
          >
            Total Payable:{"  "}
            <Text style={{ color: "lime", fontSize: 22 }}>Rs. 0.0</Text>
          </Text>
          <Text
            style={styles.uploadButton}
            onPress={() =>
              uploadToServer({
                ...pickerData,
                ...formData,
                video: videoDetails,
              })
            }
          >
            Upload Ad
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewAdPage;
