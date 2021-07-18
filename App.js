import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getInitStateStorage } from "./Components/Redux/dispatchers";
// import store from "./Components/Redux/store";
import WelcomePage from "./Components/WelcomePage/welcomePage";
import RegisterPage1 from "./Components/RegisterPage/registerPage1";
import CustomerRegisterPage from "./Components/RegisterPage/customerRegisterPage";
import RegisterPage2 from "./Components/RegisterPage/registerPage2";
import RegisterPage3 from "./Components/RegisterPage/registerPage3";
import CustomerLandingPage from "./Components/LandingPages/customerLandingPage";
import CompanyLandingPage from "./Components/LandingPages/companyLandingPage";
import RewardHistory from "./Components/LandingPages/rewardHistory";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePage from "./Components/ProfilePage/profilePage";
import NewAdPage from "./Components/UploadNewAdPage/newAdPage";
import CompanyProfilePage from "./Components/ProfilePage/companyProfilePage";
import WalletPage from "./Components/WalletPage/walletPage";
import SettingsPage from "./Components/SettingsPage/settings";
import AdQueuePage from "./Components/AdQueuePage/adQueue";
import AnalyticsDetails from "./Components/AnalyticsDetails/AnalyticsDetails";

const Stack = createStackNavigator();

const App = () => {
  // const [userId, setUserId] = useState({});
  // const [searching, setsearching] = useState(false);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.UserId);
  const userType = useSelector((state) => state.UserType);
  const loaded = useSelector((state) => state.loaded);

  // const findUserId = async () => {
  //   const userID = await AsyncStorage.getItem("UserId");
  //   const userType = await AsyncStorage.getItem("UserType");
  //   const user = { ID: userID, Type: userType };
  //   setUserId(user);
  //   setsearching(true);
  // };

  useEffect(() => {
    dispatch(getInitStateStorage());
  }, []);

  // useEffect(() => {
  //   console.log(userName);
  //   if (userName) {
  //     let user = { ID: userName, Type: userType };
  //     console.log(userName);
  //     setUserId(user);
  //     setsearching(true);
  //   }
  // }, [userName]);

  return (
    // <Provider store={store}>
    <>
      {loaded ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={
              !userName
                ? "WelcomePage"
                : userType === "Customer"
                ? "CustomerLandingPage"
                : "CompanyLandingPage"
            }
          >
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
            <Stack.Screen name="RegisterPage1" component={RegisterPage1} />
            <Stack.Screen name="RegisterPage2" component={RegisterPage2} />
            <Stack.Screen
              name="CustomerRegisterPage"
              component={CustomerRegisterPage}
            />
            <Stack.Screen name="RegisterPage3" component={RegisterPage3} />
            <Stack.Screen
              name="CustomerLandingPage"
              component={CustomerLandingPage}
            />
            <Stack.Screen
              name="CompanyLandingPage"
              component={CompanyLandingPage}
            />
            <Stack.Screen name="RewardHistory" component={RewardHistory} />
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen
              name="CompanyProfilePage"
              component={CompanyProfilePage}
            />
            <Stack.Screen name="NewAdPage" component={NewAdPage} />
            <Stack.Screen name="WalletPage" component={WalletPage} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
            <Stack.Screen name="AdQueuePage" component={AdQueuePage} />
            <Stack.Screen
              name="AnalyticsDetails"
              component={AnalyticsDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Text style={{ fontSize: 60, textAlign: "center", top: "40%" }}>
          LOGO
        </Text>
      )}
      {/* </Provider> */}
    </>
  );
};

export default App;
