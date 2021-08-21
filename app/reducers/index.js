import { combineReducers } from "redux";
import AuthReducer from "./auth";
import StyleReducer from "./style";
import CartReducer from "./cart";
import OrderReducer from "./order";
import SearchReducer from "./search";
import FilterReducer from "./filter";
import TokenReducer from "./notification";
export default combineReducers({
  auth: AuthReducer,
  style: StyleReducer,
  cart: CartReducer,
  order: OrderReducer,
  search: SearchReducer,
  notification: TokenReducer,
  filter: FilterReducer
});
