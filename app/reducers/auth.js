import * as actionTypes from "@actions/actionTypes";
const initialState = {
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        login: action.data
      };
    case actionTypes.SPLASH:
      return {
        ...state,
        splash: action.data
      };
    default:
      return state;
  }
};
