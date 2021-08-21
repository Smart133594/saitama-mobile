import * as actionTypes from "@actions/actionTypes";
const initialState = {
    product: []
};

export default (state = initialState, action = {}) => {
    let { product } = state;
    switch (action.type) {
        case actionTypes.SEARCH:
            return { product: action.product };
        case actionTypes.SEARCH_ADD:
            product.push(action.product)
            return { product };
        case actionTypes.SEARCH_REMOVE:
            if(action.id == 'all') {
                return initialState;
            }
            product = product?.map((item, index) => {
                if(item.id == action.id) {
                    return null;
                }
                return item;
            })
            product = product.filter(item => item != null);
            return { product };
        case actionTypes.SEARCH_UPDATE:
            product = product?.map((item, index) => {
                if (item.id == action.id) {
                    return item;
                }
                return item;
            })
            return { product };
        default:
            return state;
    }
};
