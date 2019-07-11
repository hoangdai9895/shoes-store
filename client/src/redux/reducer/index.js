import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";
import errors_reducer from "./errors_reducer";
import brands_reducer from "./brands_reducer";
import product_reducer from "./product_reducer";
import type_reducer from "./type_reducer";

export default combineReducers({
    auth: auth_reducer,
    errors: errors_reducer,
    brands: brands_reducer,
    products: product_reducer,
    type: type_reducer
});