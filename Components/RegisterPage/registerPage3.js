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

const RegisterPage3 = ({ navigation }) => {
  const [gender, setGender] = useState("Gender");
  const [showChooser, setshowChooser] = useState(false);
  const [pickedImage, setPickedImage] = useState("");

  return (
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
              value="gender"
              itemStyle={{ color: "gray" }}
            />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Address Line 1"
          placeholderTextColor="#aaaa"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address Line 2"
          placeholderTextColor="#aaaa"
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
              // axios
              //   .post("/uploadImage",
              //   )
              //   .then(async (res) => {
              //     console.log(res.data);
              //   })
              //   .catch((err) => {
              //     console.error(err);
              //     setloginError("Error connecting to server.");
              //   });
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
          axios
            .post("/registerPage3", { email: "Abc", image: pickedImage })
            .then((res) => {
              navigation.navigate("WelcomePage");
            })
            .catch((err) => console.log(err));
        }}
      />
    </ScrollView>
  );
};

export default RegisterPage3;
