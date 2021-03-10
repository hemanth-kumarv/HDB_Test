import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { styles } from "./profilePageStyles";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle } from "../Redux/dispatchers";
import ProfileIcon from "../../assets/person-circle.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileIconPage = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      var userData = await AsyncStorage.getItem("UserData");
      if (userData !== null) {
        userData = JSON.parse(userData);
        if (userData.ProfilePicture.length > 0)
          setImage(userData.ProfilePicture);
      }
    })();
  }, []);
  return (
    <View>
      {image ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("ProfilePage")}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: image }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <ProfileIcon
          width="40"
          height="40"
          style={[
            styles.icon,
            {
              tintColor: "white",
              marginTop: 5,
            },
          ]}
          onPress={() => navigation.navigate("ProfilePage")}
        />
      )}
    </View>
  );
};

export default ProfileIconPage;
