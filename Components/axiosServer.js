import axios from "axios";
import config from "./config.json";

import AsyncStorage from "@react-native-async-storage/async-storage";

let myPromise = new Promise(async (resolve, reject) => {
  // await AsyncStorage.setItem("configData", '');
  const configData = await AsyncStorage.getItem("configData");
  // console.log(configData);
  var serverIP = "",
    timeout = 10000;
  if (configData) {
    configDataJSON = JSON.parse(configData);
    serverIP =
      configDataJSON.ExpressServer.ServerIP +
      ":" +
      String(configDataJSON.ExpressServer.Port);
    timeout = configDataJSON.defaultTimeout;
  } else {
    await AsyncStorage.setItem("configData", JSON.stringify(config));
    serverIP =
      config.ExpressServer.ServerIP + ":" + String(config.ExpressServer.Port);
    timeout = config.defaultTimeout;
  }
  resolve({ serverIP: serverIP, timeout: timeout });
  reject("ERROROROR!");
});

export default myPromise.then((data) =>
  axios.create({
    baseURL: data.serverIP,
    timeout: data.timeout,
  })
);
