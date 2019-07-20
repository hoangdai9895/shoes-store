import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";
import errors_reducer from "./errors_reducer";
import brands_reducer from "./brands_reducer";
import product_reducer from "./product_reducer";
import type_reducer from "./type_reducer";
import cart_reducer from "./cart_reducer";
import order_reducer from "./order_reducer";

export default combineReducers({
    auth: auth_reducer,
    errors: errors_reducer,
    brands: brands_reducer,
    products: product_reducer,
    type: type_reducer,
    cart: cart_reducer,
    order: order_reducer
});