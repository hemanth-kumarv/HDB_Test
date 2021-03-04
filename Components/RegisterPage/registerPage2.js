import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Image } from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import { WithLocalSvg } from "react-native-svg";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";
import ScannerIcon from "../../assets/scanner.svg";

const RegisterPage2 = ({ navigation }) => {
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
    >
      <Text style={styles.heading}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="UPID"
          placeholderTextColor="#aaaa"
        />
        <ScannerIcon
          width="75"
          height="75"
          style={[
            {
              tintColor: "white",
              bottom: 15,
              top: 50
            }
          ]}
          // onPress={() => navigation.navigate("RegisterPage1")}
        />

        <TextInput
          style={[styles.textInput, { top: 40 }]}
          placeholder="Referral Code (If any)"
          placeholderTextColor="#aaaa"
        />
      </View>
      <LeftIcon
        width="25"
        height="25"
        style={{
          ...styles.icon,
          ...{
            left: 15
          }
        }}
        onPress={() => navigation.navigate("RegisterPage1")}
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
        onPress={() => navigation.navigate("RegisterPage3")}
      />
    </ScrollView>
  );
};

export default RegisterPage2;
