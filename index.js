import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from "react-native";

import App from './App';
// import App from './Components/LandingPages/bluetoothTest'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
AppRegistry.registerComponent('hdb', () => App);
