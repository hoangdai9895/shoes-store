import {
    GEL_ALL_PRODUCTS,
    SET_PRODCUTs_LOADING,
    GET_PRODUCT_FILTER,
    ADD_PRODUCT
} from "../actions/types";

const initialState = {
    products: [],
    loading: false,
    success: false,
    size: null,
    addProduct: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_PRODCUTs_LOADING:
            return {...state, loading: true };
        case GEL_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                loading: false,
                size: action.payload.size
            };
        case GET_PRODUCT_FILTER:
            return {
                ...state,
                products: action.payload.products,
                loading: false,
                size: action.payload.size
            };
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload.success
            };
        default:
            return state;
    }
}