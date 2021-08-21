import * as actionTypes from "@actions/actionTypes";
const initialState = {
    cart_list: [],
    cart_count: 0
};

export default (state = initialState, action = {}) => {
    let { cart_list, cart_count } = state;
    let products = [];
    let partner = {};
    switch (action.type) {
        case actionTypes.CART:
            return { cart_list: action.product, cart_count: 0 };
        case actionTypes.CART_ADD:
            if (cart_list.length > 0) {
                partner = cart_list?.find(item => item.Partner_Details_Id == action.Partner_Details_Id);
                if (partner?.Partner_Details_Id) {
                    products = partner?.products;
                    let product = products?.find((item) => item.Product_Id == action.product.Product_Id);
                    if (product?.Amount) {
                        product.Amount += 1;
                    } else {
                        products.push(action.product);
                    }
                } else {
                    products.push(action.product);
                    cart_list.push({ Partner_Details_Id: action.Partner_Details_Id, products: products });
                    cart_count = cart_count + 1;
                }
            } else {
                products.push(action.product);
                cart_list.push({ Partner_Details_Id: action.Partner_Details_Id, products: products });
                cart_count = 1;
            }
            return { cart_list, cart_count };
        case actionTypes.CART_REMOVE:
            partner = cart_list?.find(item => item.Partner_Details_Id == action.Partner_Details_Id);
            products = partner?.products;
            let product = products?.find((item) => item.Product_Id == action.Product_Id)
            product.Amount -= 1;
            products = products?.map((item) => {
                if ((action?.Amount == 0 || item.Amount == 0) && item.Product_Id == action.Product_Id) {
                    cart_count = cart_count - 1;
                    return null;
                } else {
                    return item;
                }
            });
            products = products.filter(item => item != null);
            cart_list = cart_list?.map((item) => {
                if (item.Partner_Details_Id == action.Partner_Details_Id) {
                    item.products = products;
                    return item;
                } else {
                    return item;
                }
            })
            cart_list = cart_list?.filter((item) => item.products.length != 0);
            return { cart_list, cart_count };
        case actionTypes.CART_CLEAR:
            return initialState;
        default:
            return state;
    }
};
