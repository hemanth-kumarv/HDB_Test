import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorage = async () => {
  let storageData = await AsyncStorage.multiGet([
    "UserId",
    "TotalRewards",
    "UserData",
    "UserType",
  ]);
  let data = { loaded: true };
  storageData.forEach(
    (e) =>
      (data = {
        ...data,
        [e[0]]:
          e[0] === "TotalRewards" || e[0] === "UserData"
            ? JSON.parse(e[1])
            : e[1],
      })
  );
  //   {
  //     userName: userName,
  //     totalRewards: JSON.parse(totalRewards),
  //     userData: JSON.parse(userData),
  //     userType: userType,
  //   };
  return data;
};

export const saveStorage = async (data) => {
  try {
    await AsyncStorage.multiSet(data);
    let newData = {};
    data.forEach(
      (e) =>
        (newData = {
          ...newData,
          [e[0]]:
            e[0] === "TotalRewards" || e[0] === "UserData"
              ? JSON.parse(e[1])
              : e[1],
        })
    );
    return newData;
  } catch (e) {
    console.log(e);
  }
};

export const logoutStorage = async () => {
  try {
    await AsyncStorage.multiRemove([
      "UserId",
      "TotalRewards",
      "UserData",
      "UserType",
    ]);
  } catch (e) {
    console.log(e);
  }
};
