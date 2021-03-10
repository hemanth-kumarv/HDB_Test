import axios from "axios";
import config from "./config.json";

const serverIP =
  config.ExpressServer.ServerIP + ":" + String(config.ExpressServer.Port);

export default axios.create({
  baseURL: serverIP,
  timeout: config.defaultTimeout,
});
