import React, { useState, useRef } from "react";
import { Text, View, TextInput, ScrollView, Keyboard } from "react-native";
import styles from "./welcomePageStyles";
import globalStyles from "../../globalStyles";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import config from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorSVG from "../../assets/exclamation-triangle.svg";

const WelcomePage = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState("");
  const passwordBox = useRef();

  const login = (userName, password) => {
    setloginError("");
    const serverIP =
      config.ExpressServer.ServerIP + ":" + String(config.ExpressServer.Port);
    axios
      .post(
        serverIP + "/login",
        { name: userName, pass: password },
        {
          timeout: config.defaultTimeout,
        }
      )
      .then(async (res) => {
        // console.log(res.data);
        if (res.data) setloginError(res.data);
        else {
          await AsyncStorage.setItem("UserId", userName);
          navigation.replace("CustomerLandingPage");
        }
      })
      .catch((err) => {
        console.error(err);
        setloginError("Error connecting to server.");
      });
  };

  const validateAndLogin = (userName, password) => {
    if (userName.length === 0) setloginError("Please enter valid username.");
    else if (password.length === 0)
      setloginError("Please enter valid password.");
    else {
      let pass = sha256(password).toString();
      login(userName, pass);
    }
  };
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={[
        globalStyles.containerContent,
        { justifyContent: "space-evenly" },
      ]}
      keyboardShouldPersistTaps="handled"
      // onPress={Keyboard.dismiss}
    >
      {loginError.length > 0 ? (
        <Text style={{ color: "red", fontSize: 20 }}>
          <ErrorSVG
            width="35"
            height="20"
            style={{
              top: 25,
              tintColor: "yellow",
            }}
          />
          {loginError}
        </Text>
      ) : null}
      <Text style={styles.logo}>XXX</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          placeholderTextColor="#aaaa"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={(text) => setUserName(text)}
          onSubmitEditing={() => {
            passwordBox.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.textInput}
          ref={passwordBox}
          placeholder="Password"
          autoCompleteType="password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => {
            validateAndLogin(userName, password);
          }}
        />
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </View>
      <Text
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          validateAndLogin(userName, password);
        }}
      >
        Submit
      </Text>
      <Text style={styles.registerContainer}>
        Don't have an account?&nbsp;
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate("RegisterPage1")}
        >
          Sign Up!
        </Text>
      </Text>
    </ScrollView>
  );
};

export default WelcomePage;
