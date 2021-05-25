import { DRAWER_STATE, REGISTRATION } from "./actions";

export const changeDrawerStyle = (type) => ({
  type: DRAWER_STATE,
  payload: type,
});

export const registration = (data) => ({
  type: REGISTRATION,
  payload: data,
});
