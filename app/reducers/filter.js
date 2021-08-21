import * as actionTypes from "@actions/actionTypes";
const initialState = {
    filter: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.FILTER:
            return action.filter;
        default:
            return state;
    }
};
