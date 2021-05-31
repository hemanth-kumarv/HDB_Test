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
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";
import axios from "../axiosServer";
import { useSelector, useDispatch } from "react-redux";
import { registration } from "../Redux/dispatchers";

const RegisterPage3 = ({ navigation }) => {
  const [gender, setGender] = useState("Gender");
  const [address, setAddress] = useState({ addrLine1: "", addrLine2: "" });
  const [pickedImage, setPickedImage] = useState("");

  const registrationData = useSelector((state) => state.registrationData);
  const dispatch = useDispatch();

  return (
    <>
      {Object.keys(registrationData).length ? (
        <ScrollView
          style={globalStyles.container}
          contentContainerStyle={globalStyles.containerContent}
        >
          <Text style={styles.heading}>Register</Text>
          <View style={styles.inputContainer}>
            <View style={styles.dropdownPicker}>
              <Picker
                selectedValue={gender}
                style={{ color: "#fff" }}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                mode="dropdown"
                dropdownIconColor="white"
              >
                <Picker.Item
                  label="Gender"
                  value="Gender"
                  itemStyle={{ color: "gray" }}
                />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Address Line 1"
              placeholderTextColor="#aaaa"
              value={address.addrLine1}
              onChangeText={(text) =>
                setAddress({ ...address, addrLine1: text })
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Address Line 2"
              placeholderTextColor="#aaaa"
              value={address.addrLine2}
              onChangeText={(text) =>
                setAddress({ ...address, addrLine2: text })
              }
            />
            <Text
              style={styles.textInput}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 400,
                  height: 400,
                  cropping: true,
                }).then(async (image) => {
                  var img = await RNFS.readFile(image.path, "base64");
                  setPickedImage("data:" + image.mime + ";base64," + img);
                });
              }}
            >
              Profile Photo
            </Text>
            {pickedImage.length === 0 ? null : (
              <Image
                style={{
                  top: 50,
                  width: 128,
                  height: 128,
                  borderColor: "white",
                  borderWidth: 2,
                }}
                source={{ uri: pickedImage }}
                // resizeMode="contain"
              />
            )}
          </View>
          <LeftIcon
            width="25"
            height="25"
            style={[
              styles.icon,
              {
                left: 15,
              },
            ]}
            onPress={() => navigation.navigate("RegisterPage2")}
          />
          <RightIcon
            width="25"
            height="25"
            style={[
              styles.icon,
              {
                right: 15,
              },
            ]}
            onPress={() => {
              // console.log(pickedImage);
              let data = {
                ...registrationData,
                type: "Customer",
                Gender: gender === "Gender" ? "" : gender,
                Address1: address.addrLine1,
                Address2: address.addrLine2,
                ProfilePicture: pickedImage,
              };
              axios.then((server) =>
                server
                  .post("/registration", data)
                  .then((res) => {
                    navigation.navigate("WelcomePage");
                  })
                  .catch((err) => console.log(err))
              );
            }}
          />
        </ScrollView>
      ) : (
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Registration Timed out. Please register again.
        </Text>
      )}
    </>
  );
};

export default RegisterPage3;
