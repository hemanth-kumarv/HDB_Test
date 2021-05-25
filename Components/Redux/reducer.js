import { DRAWER_STATE, REGISTRATION } from "./actions";
const initialState = { drawerOpen: false, registrationData: {} };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_STATE:
      return {
        ...state,
        drawerOpen: action.payload,
      };

    case REGISTRATION:
      return {
        ...state,
        registrationData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
