import RNBluetoothClassic from "react-native-bluetooth-classic";

var device;
const performRead = async () => {
  let ret = device.onDataReceived((res) => console.log(res));
};

export const sendData = async (id) => {
  try {
    await device.write(String(id));
    console.log("Successfully sent ", id);
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 401, message: error };
  }
};

export const btConnection = async () => {
  let status = await RNBluetoothClassic.requestBluetoothEnabled();
  if (status) {
    try {
      let unpaired = await RNBluetoothClassic.startDiscovery();
      let rpi = unpaired.find((o) => o.name === "raspberrypi");

      if (rpi) {
        let conn = await RNBluetoothClassic.getBondedDevices();
        let connStatus = conn.find((o) => o.name === "raspberrypi");
        if (!connStatus) {
          console.log("Pairing.....");
          await RNBluetoothClassic.pairDevice(rpi.id);
        }
        try {
          device = await RNBluetoothClassic.connectToDevice(rpi.id, {});
          await device.connect({ SECURE_SOCKET: false });
          performRead();
          console.log("Connected successfully to ", rpi);
          return { status: 200, btDevice: rpi.id };
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("Bluetooth error!");
        return { status: 404, message: "Bluetooth scan error. Please retry." };
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    return { status: 401, message: "Please turn ON bluetooth to continue." };
  }
  return { status: 0 };
};
