import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import { registration } from "../Redux/dispatchers";
import { useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import RightIcon from "../../assets/chevron-right.svg";
import sha256 from "crypto-js/sha256";
import axios from "../axiosServer";

const RegisterPage1 = ({ navigation }) => {
  const [showDate, setShowDate] = useState(false);

  // const registrationData = useSelector((state) => state.registrationData);
  const dispatch = useDispatch();

  const MobileNumber = useRef();
  const Email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [fields, setFields] = useState({
    Name: { data: "", active: true },
    MobileNumber: { data: "", active: true },
    Email: { data: "", active: true },
    password: { data: "", active: true },
    confirmPassword: { data: "", active: true, equal: false },
    DateOfBirth: { data: "", active: true },
  });
  const [existingEmails, setExistingEmails] = useState({
    companies: [],
    customers: [],
  });
  const [errorText, setErrorText] = useState("");
  const [userType, setUserType] = useState(false);

  useEffect(() => {
    axios.then((server) =>
      server
        .post("/getAvailableEmails")
        .then((res) => setExistingEmails(res.data))
        .catch((err) => console.log(err))
    );
  }, []);

  const nextPage = () => {
    let check = true,
      existing = false,
      newFields = { ...fields };
    for (let i in fields) {
      if (!fields[i].data) {
        newFields = { ...newFields, [i]: { data: "", active: false } };
        check = false;
      }
    }
    if (!fields.confirmPassword.equal) check = false;
    existing = userType
      ? existingEmails.companies.includes(fields.Email.data)
      : existingEmails.customers.includes(fields.Email.data);
    if (check && !existing) {
      let data = {};
      for (let i in fields) {
        if (i === "password" || i === "confirmPassword")
          data["Password"] = sha256(fields[i].data).toString();
        else if (i === "DateOfBirth")
          data[i] = dateFormatter(fields[i].data.split(" "));
        else data[i] = fields[i].data;
      }
      dispatch(registration(data));
      navigation.navigate(userType ? "CustomerRegisterPage" : "RegisterPage2");
    } else {
      if (!check) {
        setFields(newFields);
        setErrorText("Please fill the mandatory fields.");
      } else {
        Email.current.setNativeProps({
          style: { borderBottomColor: "red" },
        });
        setErrorText("Email already exists!");
      }
    }
  };

  const dateFormatter = (date) =>
    "".concat(date[2], " ", date[1], " ", date[3]);

  const validateStyle = (name) => {
    if (name === "confirmPassword") {
      return {
        borderBottomColor: fields[name].active
          ? "gray"
          : fields[name].equal && fields[name].data
          ? "gray"
          : "red",
      };
    }
    return {
      borderBottomColor: fields[name].active
        ? "gray"
        : fields[name].data
        ? "gray"
        : "red",
    };
  };

  const updateFields = (name, data) => {
    let equal = null,
      obj = {
        ...fields,
        ...{
          [name]: { data: data, active: false },
        },
      };
    if (name === "password") equal = data === fields.confirmPassword.data;
    if (name === "confirmPassword") equal = data === fields.password.data;

    if (equal !== null)
      obj = {
        ...obj,
        ...{ confirmPassword: { ...obj.confirmPassword, equal: equal } },
      };
    return obj;
  };

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={[
        globalStyles.containerContent,
        { justifyContent: "space-evenly" },
      ]}
    >
      <Text style={styles.errorText}>{errorText}</Text>
      <Text style={styles.heading}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, validateStyle("Name")]}
          placeholder="Full Name"
          placeholderTextColor="#aaaa"
          textContentType="username"
          onSubmitEditing={() => {
            MobileNumber.current.focus();
          }}
          value={fields.Name.data}
          onChangeText={(data) => setFields(updateFields("Name", data))}
          onBlur={() => setFields(updateFields("Name", fields.Name.data))}
        />
        <TextInput
          style={[styles.textInput, validateStyle("MobileNumber")]}
          ref={MobileNumber}
          placeholder="Mobile Number"
          placeholderTextColor="#aaaa"
          keyboardType="number-pad"
          //   maxLength="10"
          textContentType="telephoneNumber"
          onSubmitEditing={() => {
            Email.current.focus();
          }}
          value={fields.MobileNumber.data}
          onChangeText={(data) => setFields(updateFields("MobileNumber", data))}
          onBlur={() =>
            setFields(updateFields("MobileNumber", fields.MobileNumber.data))
          }
        />
        <TextInput
          style={[styles.textInput, validateStyle("Email")]}
          ref={Email}
          placeholder="Email ID"
          autoCapitalize="none"
          placeholderTextColor="#aaaa"
          textContentType="emailAddress"
          keyboardType="email-address"
          onSubmitEditing={() => {
            password.current.focus();
          }}
          value={fields.Email.data}
          onChangeText={(data) => setFields(updateFields("Email", data))}
          onBlur={() => setFields(updateFields("Email", fields.Email.data))}
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
        <Text
          onPress={() => {
            if (!showDate) setShowDate(true);
          }}
          style={[
            styles.textInput,
            fields.DateOfBirth.data.length ? null : { color: "gray" },
            validateStyle("DateOfBirth"),
          ]}
        >
          {fields.DateOfBirth.data.length
            ? dateFormatter(fields.DateOfBirth.data.split(" "))
            : "Date of Birth"}
        </Text>
        {showDate && (
          <DateTimePicker
            style={[styles.textInput]}
            value={
              fields.DateOfBirth.data.length
                ? new Date(fields.DateOfBirth.data)
                : new Date()
            }
            mode="date"
            onChange={(e, date) => {
              if (date) setFields(updateFields("DateOfBirth", String(date)));
              else setFields(updateFields("DateOfBirth", ""));
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
      <KeyboardAvoidingView style={[styles.switch]} behavior={"height"}>
        <Text style={styles.switchText}>Customer</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#2176FF" }}
          thumbColor={"#f4f3f4"}
          // ios_backgroundColor="#3e3e3e"
          onValueChange={() => setUserType(!userType)}
          value={userType}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
        <Text style={styles.switchText}>Company</Text>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterPage1;
