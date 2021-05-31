import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Switch } from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { registration } from "../Redux/dispatchers";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";
import ScannerIcon from "../../assets/scanner.svg";
import QRCodeScanner from "react-native-qrcode-scanner";
import Flash from "../../assets/lightning.svg";
import X from "../../assets/x-circle.svg";

const RegisterPage2 = ({ navigation }) => {
  const [fields, setFields] = useState({
    upid: { data: "", active: true },
    referralCode: { data: "" },
  });
  const [flash, setFlash] = useState(0);
  const [scanner, showScanner] = useState(false);
  const [errorText, setErrorText] = useState("");

  const registrationData = useSelector((state) => state.registrationData);
  const dispatch = useDispatch();

  const nextPage = () => {
    if (fields.upid.data) {
      dispatch(
        registration({
          ...registrationData,
          Referral: fields.referralCode.data,
          UPID: fields.upid.data,
        })
      );
      navigation.navigate("RegisterPage3");
    } else {
      setFields({
        ...fields,
        upid: { data: "", active: false },
      });
      setErrorText("Please fill the mandatory fields.");
    }
  };
  const TopContent = (
    <>
      <Flash
        width="35"
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
    <>
      {Object.keys(registrationData).length ? (
        <ScrollView
          style={globalStyles.container}
          contentContainerStyle={globalStyles.containerContent}
        >
          {scanner ? (
            <QRCodeScanner
              cameraStyle={styles.cameraStyle}
              onRead={(e) => {
                showScanner(false);
                setFields({ ...fields, upid: { data: e.data, active: false } });
              }}
              flashMode={flash}
              showMarker={true}
              topContent={TopContent}
            />
          ) : (
            <>
              <Text style={styles.errorText}>{errorText}</Text>
              <Text style={styles.heading}>Register</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      borderBottomColor: fields.upid.active
                        ? "gray"
                        : fields.upid.data
                        ? "gray"
                        : "red",
                    },
                  ]}
                  placeholder="UPID"
                  placeholderTextColor="#aaaa"
                  onChangeText={(text) =>
                    setFields({
                      ...fields,
                      upid: { data: text, active: false },
                    })
                  }
                  onBlur={() =>
                    setFields({
                      ...fields,
                      upid: { data: fields.upid.data, active: false },
                    })
                  }
                  value={fields.upid.data}
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
                  onChangeText={(text) =>
                    setFields({
                      ...fields,
                      referralCode: { data: text },
                    })
                  }
                  value={fields.referralCode.data}
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
                onPress={() => nextPage()}
              />
            </>
          )}
        </ScrollView>
      ) : (
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Registration Timed out. Please register again.
        </Text>
      )}
    </>
  );
};

export default RegisterPage2;
