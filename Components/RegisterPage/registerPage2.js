import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";
import ScannerIcon from "../../assets/scanner.svg";
import QRCodeScanner from "react-native-qrcode-scanner";
import Flash from "../../assets/lightning.svg";
import X from "../../assets/x-circle.svg";

const RegisterPage2 = ({ navigation }) => {
  const [upid, setUpid] = useState("");
  const [flash, setFlash] = useState(0);
  const [scanner, showScanner] = useState(false);

  const TopContent = (
    <>
      <Flash
        width="40"
        height="40"
        style={[
          {
            tintColor: flash === 0 ? "white" : "yellow",
            left: 15,
            zIndex: 5,
            position: "absolute",
            top: 50,
          },
        ]}
        onPress={() => (flash === 0 ? setFlash(2) : setFlash(0))}
      />
      <X
        width="40"
        height="40"
        style={[
          {
            tintColor: "red",
            right: 15,
            zIndex: 5,
            position: "absolute",
            top: 50,
          },
        ]}
        onPress={() => showScanner(false)}
      />
    </>
  );
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={globalStyles.containerContent}
    >
      {scanner ? (
        <QRCodeScanner
          cameraStyle={styles.cameraStyle}
          onRead={(e) => {
            showScanner(false);
            setUpid(e.data);
          }}
          flashMode={flash}
          showMarker={true}
          topContent={TopContent}
        />
      ) : (
        <>
          <Text style={styles.heading}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="UPID"
              placeholderTextColor="#aaaa"
              onChangeText={(text) => setUpid(text)}
              value={upid}
            />
            <ScannerIcon
              width="75"
              height="75"
              style={[
                {
                  tintColor: "white",
                  bottom: 15,
                  top: 50,
                },
              ]}
              onPress={() => showScanner(true)}
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
                left: 15,
              },
            }}
            onPress={() => navigation.navigate("RegisterPage1")}
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
            onPress={() => navigation.navigate("RegisterPage3")}
          />
        </>
      )}
    </ScrollView>
  );
};

export default RegisterPage2;
