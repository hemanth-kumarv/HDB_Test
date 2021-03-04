import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Keyboard
} from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
// import { WithLocalSvg } from "react-native-svg";
import RightIcon from "../../assets/chevron-right.svg";

const RegisterPage1 = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={[
        globalStyles.containerContent,
        ,
        { justifyContent: "space-evenly" }
      ]}
    >
      <Text style={styles.heading}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor="#aaaa"
          textContentType="username"
        />
        {/* {show && <DateTimePicker
          testID="dateTimePicker"
          style={styles.textInput}
          value={date}
          mode="date"
          onChange={onChange}
        />} */}
        <DatePicker
          style={styles.textInput}
          date={date}
          mode="date"
          placeholder="Date of Birth"
          format="DD-MM-YYYY"
          showIcon={false}
          customStyles={{
            dateIcon: {
              position: "absolute",
              right: 0,
              top: 4,
              marginRight: 0
            },
            dateInput: {
              position: "absolute",
              left: 0,
              borderWidth: 0
            },
            placeholderText: { color: "#aaaa" },
            dateText: { color: "#ffff" }
          }}
          onDateChange={date => {
            setDate(date);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mobile Number"
          placeholderTextColor="#aaaa"
          keyboardType="number-pad"
          //   maxLength="10"
          textContentType="telephoneNumber"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email ID"
          placeholderTextColor="#aaaa"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <RightIcon
        width="25"
        height="25"
        style={[
          styles.icon,
          {
            right: 15
          }
        ]}
        onPress={() => navigation.navigate("RegisterPage2")}
      />
    </ScrollView>
  );
};

export default RegisterPage1;
