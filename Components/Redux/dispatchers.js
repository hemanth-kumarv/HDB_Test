import { DRAWER_STATE } from "./actions";

export const changeDrawerStyle = type => ({
  type: DRAWER_STATE,
  payload: type
});
