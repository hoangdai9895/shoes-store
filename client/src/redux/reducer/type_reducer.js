import { GET_ALL_TYPE, SET_LOADING_TYPE } from "../actions/types";
const initialState = {
    list: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING_TYPE:
            return {...state, loading: true };
        case GET_ALL_TYPE:
            return {...state, list: action.payload, loading: false };
        default:
            return state;
    }
}