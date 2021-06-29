import {
  INIT_STATE_STORAGE,
  DRAWER_STATE,
  REGISTRATION,
  BLUETOOTH_DATA,
} from "./actions";
import { getStorage, saveStorage, logoutStorage } from "./asyncStorageRedux";

export const getInitStateStorage = () => (dispatch) => {
  getStorage().then((e) =>
    dispatch({
      type: INIT_STATE_STORAGE,
      payload: e,
    })
  );
};

export const setAsyncStorage = (data) => (dispatch) =>
  saveStorage(data).then((e) =>
    dispatch({
      type: INIT_STATE_STORAGE,
      payload: e,
    })
  );

export const logout = () => (dispatch) =>
  logoutStorage().then((e) =>
    dispatch({
      type: INIT_STATE_STORAGE,
      payload: e,
    })
  );

export const changeDrawerStyle = (type) => ({
  type: DRAWER_STATE,
  payload: type,
});

export const registration = (data) => ({
  type: REGISTRATION,
  payload: data,
});

export const setReceivedBTData = (data) => ({
  type: BLUETOOTH_DATA,
  payload: data,
});
