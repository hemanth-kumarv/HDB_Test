import { registerRootComponent } from "expo";
import React from "react";
import { AppRegistry, Platform } from "react-native";
import { Provider } from "react-redux";
import store from "./Components/Redux/store";

import App from "./App";
// import App from './Components/LandingPages/bluetoothTest'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
AppRegistry.registerComponent("hdb", () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
