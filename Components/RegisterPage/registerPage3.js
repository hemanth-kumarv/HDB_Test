import React, { useState } from "react";
import { Text, View, ScrollView, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
// import { WithLocalSvg } from "react-native-svg";
import ImagePicker from "react-native-image-picker";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";

const RegisterPage3 = ({ navigation }) => {
  const [gender, setGender] = useState("Gender");
  const [photo, setPhoto] = useState(null);
  const handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };
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
        <Text style={styles.textInput}>Profile Photo</Text>
      </View>
      <LeftIcon
        width="25"
        height="25"
        style={[
          styles.icon,
          {
            left: 15
          }
        ]}
        onPress={() => navigation.navigate("RegisterPage2")}
      />
      <RightIcon
        width="25"
        height="25"
        style={[
          styles.icon,
          {
            right: 15
          }
        ]}
        onPress={() => navigation.navigate("WelcomePage")}
      />
    </ScrollView>
  );
};

export default RegisterPage3;
