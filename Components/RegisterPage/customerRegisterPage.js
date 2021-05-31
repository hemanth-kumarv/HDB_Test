import React, { useState } from "react";
import { Text, View, TextInput, Image, ScrollView } from "react-native";
import styles from "./registerPageStyles";
import globalStyles from "../../globalStyles";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axiosServer";
import LeftIcon from "../../assets/chevron-left.svg";
import RightIcon from "../../assets/chevron-right.svg";

// {userType ? (
//   <CustomerRegisterPage
//     setData={(name, value) =>
//       setCustomerData({ ...customerData, [name]: value })
//     }
//     getData={customerData}
//   />
// ) : (
const CustomerRegisterPage = ({ navigation }) => {
  const [pickedImage, setPickedImage] = useState("");
  const [customerData, setCustomerData] = useState({
    companyName: { data: "", active: true },
    addrLine1: "",
    addrLine2: "",
    logo: "",
  });
  const [errorText, setErrorText] = useState("");

  const registrationData = useSelector((state) => state.registrationData);

  const nextPage = () => {
    if (customerData.companyName.data) {
      let data = {
        ...registrationData,
        type: "Company",
        CompanyName: customerData.companyName.data,
        Address1: customerData.addrLine1,
        Address2: customerData.addrLine2,
        ProfilePicture: customerData.logo,
      };
      axios.then((server) =>
        server
          .post("/registration", data)
          .then((res) => {
            navigation.navigate("WelcomePage");
          })
          .catch((err) => console.log(err))
      );
    } else {
      setCustomerData({
        ...customerData,
        companyName: { data: "", active: false },
      });
      setErrorText("Please fill the mandatory fields.");
    }
  };

  return (
    <>
      {Object.keys(registrationData).length ? (
        <ScrollView
          style={globalStyles.container}
          contentContainerStyle={globalStyles.containerContent}
        >
          <Text style={styles.errorText}>{errorText}</Text>
          <Text style={styles.heading}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderBottomColor: customerData.companyName.active
                    ? "gray"
                    : customerData.companyName.data
                    ? "gray"
                    : "red",
                },
              ]}
              placeholder="Company Name"
              placeholderTextColor="#aaaa"
              value={customerData.companyName.data}
              onChangeText={(text) =>
                setCustomerData({
                  ...customerData,
                  companyName: { data: text, active: false },
                })
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Company Address Line 1"
              placeholderTextColor="#aaaa"
              value={customerData.addrLine1}
              onChangeText={(text) =>
                setCustomerData({ ...customerData, addrLine1: text })
              }
            />
            <TextInput
              style={styles.textInput}
              placeholder="Company Address Line 2"
              placeholderTextColor="#aaaa"
              value={customerData.addrLine2}
              onChangeText={(text) =>
                setCustomerData({ ...customerData, addrLine2: text })
              }
            />
            <Text
              style={styles.textInput}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 400,
                  height: 400,
                  cropping: true,
                }).then(async (image) => {
                  let img = await RNFS.readFile(image.path, "base64");
                  let imageData = String(
                    "data:" + image.mime + ";base64," + img
                  );
                  setCustomerData({ ...customerData, logo: imageData });
                });
              }}
            >
              Company Logo
            </Text>
            {pickedImage.length === 0 ? null : (
              <Image
                style={{
                  top: 50,
                  width: 128,
                  height: 128,
                  borderColor: "white",
                  borderWidth: 2,
                }}
                source={{ uri: pickedImage }}
                // resizeMode="contain"
              />
            )}
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

export default CustomerRegisterPage;
