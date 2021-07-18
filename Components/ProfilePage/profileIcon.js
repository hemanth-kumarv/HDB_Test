import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { styles } from "./profilePageStyles";
import globalStyles from "../../globalStyles";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawerStyle } from "../Redux/dispatchers";
import ProfileIcon from "../../assets/person-circle.svg";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileIconPage = ({ navigation, route }) => {
  // const [image, setImage] = useState(null);
  // const [userType, setUserType] = useState("Customer");
  const userData = useSelector((state) => state.UserData);
  const userType = useSelector((state) => state.UserType);

  return (
    <View>
      {Object.keys(userData || {}).length ? (
        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            userType === "Customer"
              ? navigation.navigate("ProfilePage")
              : navigation.navigate("CompanyProfilePage")
          }
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: userData.ProfilePicture }}
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
          onPress={() =>
            userType === "Customer"
              ? navigation.navigate("ProfilePage")
              : navigation.navigate("CompanyProfilePage")
          }
        />
      )}
    </View>
  );
};

export default ProfileIconPage;
