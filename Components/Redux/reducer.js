import { DRAWER_STATE } from "./actions";
const initialState = { drawerOpen: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_STATE:
      return {
        ...state,
        drawerOpen: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
