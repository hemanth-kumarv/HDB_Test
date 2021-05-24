import React, { useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Keyboard,
} from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
// import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RightIcon from "../../assets/chevron-right.svg";

const RegisterPage1 = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const [showDate, setShowDate] = useState(false);

  const mobileNumber = useRef();
  const emailId = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [fields, setFields] = useState({
    name: { data: "", active: true },
    mobileNumber: { data: "", active: true },
    emailId: { data: "", active: true },
    password: { data: "", active: true },
    confirmPassword: { data: "", active: true },
    // dateOfBirth: { data: "", active: true },
  });
  const nextPage = () => {
    navigation.navigate("RegisterPage2");
  };

  const validateStyle = (name) => ({
    borderBottomColor: fields[name].active
      ? "gray"
      : fields[name].data
      ? "gray"
      : "red",
  });
  const updateFields = (name, data) => ({
    ...fields,
    ...{ [name]: { data: data, active: false } },
  });
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={[
        globalStyles.containerContent,
        ,
        { justifyContent: "space-evenly" },
      ]}
    >
      <Text style={styles.heading}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, validateStyle("name")]}
          placeholder="Full Name"
          placeholderTextColor="#aaaa"
          textContentType="username"
          onSubmitEditing={() => {
            mobileNumber.current.focus();
          }}
          value={fields.name.data}
          onChangeText={(data) => setFields(updateFields("name", data))}
          onBlur={() => setFields(updateFields("name", fields.name.data))}
        />
        <TextInput
          style={[styles.textInput, validateStyle("mobileNumber")]}
          ref={mobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#aaaa"
          keyboardType="number-pad"
          //   maxLength="10"
          textContentType="telephoneNumber"
          onSubmitEditing={() => {
            emailId.current.focus();
          }}
          value={fields.mobileNumber.data}
          onChangeText={(data) => setFields(updateFields("mobileNumber", data))}
          onBlur={() =>
            setFields(updateFields("mobileNumber", fields.mobileNumber.data))
          }
        />
        <TextInput
          style={[styles.textInput, validateStyle("emailId")]}
          ref={emailId}
          placeholder="Email ID"
          placeholderTextColor="#aaaa"
          textContentType="emailAddress"
          keyboardType="email-address"
          onSubmitEditing={() => {
            password.current.focus();
          }}
          value={fields.emailId.data}
          onChangeText={(data) => setFields(updateFields("emailId", data))}
          onBlur={() => setFields(updateFields("emailId", fields.emailId.data))}
        />
        <TextInput
          style={[styles.textInput, validateStyle("password")]}
          ref={password}
          placeholder="Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
          onSubmitEditing={() => {
            confirmPassword.current.focus();
          }}
          value={fields.password.data}
          onChangeText={(data) => setFields(updateFields("password", data))}
          onBlur={() =>
            setFields(updateFields("password", fields.password.data))
          }
        />
        <TextInput
          style={[styles.textInput, validateStyle("confirmPassword")]}
          ref={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
          value={fields.confirmPassword.data}
          onChangeText={(data) =>
            setFields(updateFields("confirmPassword", data))
          }
          onBlur={() =>
            setFields(
              updateFields("confirmPassword", fields.confirmPassword.data)
            )
          }
        />
        <Text onPress={() => setShowDate(true)} style={styles.textInput}>
          {date ? date : "Date of Birth"}
        </Text>
        {showDate && (
          <DateTimePicker
            style={[styles.textInput]}
            value={new Date()}
            mode="date"
            onChange={(e, date) => {
              let arr = String(date).split(" ");
              let newDate = "".concat(arr[2], " ", arr[1], " ", arr[3])
              setDate(newDate);
              setShowDate(false);
            }}
          />
        )}
      </View>
      <RightIcon
        width="25"
        height="25"
        style={[
          styles.icon,
          {
            right: 15,
          },
        ]}
        onPress={() => nextPage()}
      />
    </ScrollView>
  );
};

export default RegisterPage1;
