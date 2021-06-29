import RNBluetoothClassic from "react-native-bluetooth-classic";

import { setReceivedBTData } from "./Redux/dispatchers";
import ReduxStore from "./Redux/store";

var device;
const performRead = async (setTID) => {
  // console.log(setTID);
  // setTID("KML8-560095")
  let ret = device.onDataReceived(async (res) => {
    console.log(res);
    let data = String(res.data);
    if (data.startsWith("_init;TID:"))
      setTID({
        data: data.substring(10).replace(/[\r\n]+/gm, ""),
        searching: false,
      });
    ReduxStore.dispatch(setReceivedBTData(res.data));
  });
};

export const sendData = async (id, uName) => {
  try {
    await device.write(String(id) + "?" + uName);
    console.log("Successfully sent ", id);
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return {
      status: 401,
      message: "Bluetooth disconnected. Please reconnect.",
    };
  }
};

export const btConnection = async (deviceName, setTID) => {
  let status = await RNBluetoothClassic.requestBluetoothEnabled();
  if (status) {
    try {
      let unpaired = await RNBluetoothClassic.startDiscovery();
      RNBluetoothClassic.onDeviceDiscovered((e) => {
        if (e.name === deviceName) RNBluetoothClassic.cancelDiscovery();
      });
      let rpi = unpaired.find((o) => o.name === deviceName);

      if (rpi) {
        let conn = await RNBluetoothClassic.getBondedDevices();
        let connStatus = conn.find((o) => o.name === deviceName);
        if (!connStatus) {
          console.log("Pairing.....");
          await RNBluetoothClassic.pairDevice(rpi.id);
        }
        try {
          device = await RNBluetoothClassic.connectToDevice(rpi.id, {});
          await device.connect({ SECURE_SOCKET: false });
          performRead(setTID);
          console.log("Connected successfully to ", rpi.name, " - ", rpi.id);
          return { status: 200, btDevice: rpi.id };
        } catch (e) {
          console.log(e);
          return {
            status: 404,
            message: "Could not connect to Bluetooth. Please Retry.",
          };
        }
      } else {
        console.log("Bluetooth error!");
        return { status: 404, message: "Bluetooth scan error. Please retry." };
      }
    } catch (e) {
      console.log(e);
      return { status: 404, message: "Unable to scan device. Please retry." };
    }
  } else {
    return { status: 401, message: "Please turn ON bluetooth to continue." };
  }
  return { status: 0 };
};
