import {
  DRAWER_STATE,
  REGISTRATION,
  INIT_STATE_STORAGE,
  BLUETOOTH_DATA,
  ANALYTICS_DATA,
} from "./actions";
const initialState = {
  UserId: "",
  TotalRewards: {},
  UserData: {},
  UserType: "",
  drawerOpen: false,
  registrationData: {},
  loaded: false,
  receivedBTData: "",
  AnalyticsData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATE_STORAGE:
      return { ...state, ...action.payload };
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

    case BLUETOOTH_DATA:
      return {
        ...state,
        receivedBTData: action.payload,
      };

    case ANALYTICS_DATA:
      return {
        ...state,
        AnalyticsData: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
