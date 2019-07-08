import {
    SET_BRANDS_LOADING,
    GET_ALL_BRANDS,
    ADD_BRAND
} from "../actions/types";

const initialState = {
    brands: [],
    loading: false,
    success: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_BRANDS_LOADING:
            return {...state, loading: true };
        case GET_ALL_BRANDS:
            // console.log(action.payload);
            return {...state, brands: action.payload, loading: false };
        case ADD_BRAND:
            return {
                ...state,
                brands: [action.payload.brand, ...state.brands],
                success: action.payload.success
            };
        default:
            return state;
    }
}