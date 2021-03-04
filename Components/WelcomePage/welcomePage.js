import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, Keyboard } from "react-native";
import styles from "./welcomePageStyles";
import globalStyles from "../../globalStyles";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import config from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomePage = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState("");
  const login = (userName, password) => {
    const serverIP =
      config.ExpressServer.ServerIP + ":" + String(config.ExpressServer.Port);
    axios
      .post(
        serverIP + "/login",
        {},
        { params: { name: userName, pass: password } }
      )
      .then(async (res) => {
        // console.log(res.data);
        if (res.data) setloginError(res.data);
        else {
          setloginError("");
          await AsyncStorage.setItem("UserId", userName);
          navigation.navigate("CustomerLandingPage");
        }
      })
      .catch((err) => {
        console.error(err);
        setloginError(err);
      });
  };
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={[
        globalStyles.containerContent,
        { justifyContent: "space-evenly" },
      ]}
      // onPress={Keyboard.dismiss}
    >
      <Text style={{ color: "red", fontSize: 20 }}>{loginError}</Text>
      <Text style={styles.logo}>XXX</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="User Name"
          placeholderTextColor="#aaaa"
          textContentType="username"
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#aaaa"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </View>
      <Text
        style={styles.button}
        onPress={() => login(userName, sha256(password).toString())}
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
