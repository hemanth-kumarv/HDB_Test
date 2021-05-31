import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./Components/Redux/store";
import WelcomePage from "./Components/WelcomePage/welcomePage";
import RegisterPage1 from "./Components/RegisterPage/registerPage1";
import CustomerRegisterPage from "./Components/RegisterPage/customerRegisterPage";
import RegisterPage2 from "./Components/RegisterPage/registerPage2";
import RegisterPage3 from "./Components/RegisterPage/registerPage3";
import CustomerLandingPage from "./Components/LandingPages/customerLandingPage";
import CompanyLandingPage from "./Components/LandingPages/companyLandingPage";
import RewardHistory from "./Components/LandingPages/rewardHistory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePage from "./Components/ProfilePage/profilePage";
import WalletPage from "./Components/WalletPage/walletPage";
import SettingsPage from "./Components/SettingsPage/settings";

const Stack = createStackNavigator();

const App = () => {
  const [userId, setUserId] = useState({});
  const [searching, setsearching] = useState(false);
  const findUserId = async () => {
    const userID = await AsyncStorage.getItem("UserId");
    const userType = await AsyncStorage.getItem("UserType");
    const user = { ID: userID, Type: userType };
    setUserId(user);
    setsearching(true);
  };
  useEffect(() => {
    findUserId();
  }, []);
  return (
    <Provider store={store}>
      {searching ? (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={
              !Object.keys(userId).length
                ? "WelcomePage"
                : userId.Type === "Customer"
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
            <Stack.Screen name="WalletPage" component={WalletPage} />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : null}
    </Provider>
  );
};

export default App;
