import {
    GEL_ALL_PRODUCTS,
    SET_PRODCUTs_LOADING,
    GET_PRODUCT_FILTER,
    ADD_PRODUCT,
    GET_DETAIL,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
} from "../actions/types";

const initialState = {
    products: [],
    product: {},
    loading: false,
    success: false,
    size: 0,
    addProduct: false,
    updateSuccess: false
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
        case GET_DETAIL:
            return {...state, product: action.payload.product, loading: false, success: true }
        case DELETE_PRODUCT:
            return {...state, products: state.products.filter(item => item._id !== action.payload.product._id), size: state.size - 1 }
        case UPDATE_PRODUCT:
            return {...state, product: action.payload.product, updateSuccess: action.payload.success, }
        default:
            return state;
    }
}