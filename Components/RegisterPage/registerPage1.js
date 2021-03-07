import React, { useState, useRef } from "react";
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
import DatePicker from "react-native-datepicker";
import RightIcon from "../../assets/chevron-right.svg";

const RegisterPage1 = ({ navigation }) => {
  const [date, setDate] = useState(null);
  
  // const validateField = (name, validator) => {}

  const mobileNumber = useRef();
  const emailId = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const nextPage = () => {
    navigation.navigate("RegisterPage2");
  };
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
          placeholder="Full Name"
          placeholderTextColor="#aaaa"
          textContentType="username"
          onSubmitEditing={() => {
            mobileNumber.current.focus();
          }}
          // onBlur={()=>}
        />
        <TextInput
          style={styles.textInput}
          ref={mobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#aaaa"
          keyboardType="number-pad"
          //   maxLength="10"
          textContentType="telephoneNumber"
          onSubmitEditing={() => {
            emailId.current.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          ref={emailId}
          placeholder="Email ID"
          placeholderTextColor="#aaaa"
          textContentType="emailAddress"
          keyboardType="email-address"
          onSubmitEditing={() => {
            password.current.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          ref={password}
          placeholder="Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPassword.current.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          ref={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
        />
        <DatePicker
          style={styles.textInput}
          date={date}
          mode="date"
          placeholder="Date of Birth"
          // maxDate=""
          format="DD-MM-YYYY"
          showIcon={false}
          customStyles={{
            // dateIcon: {
            //   position: "absolute",
            //   right: 0,
            //   // top: 4,
            //   marginRight: 0
            // },
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
        onPress={() => nextPage()}
      />
    </ScrollView>
  );
};

export default RegisterPage1;
