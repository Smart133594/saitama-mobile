import * as actionTypes from "@actions/actionTypes";
const initialState = {
  token: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.NOTIFICATION:
        return {
          token: action.token
        };
    default:
      return state;
  }
};
