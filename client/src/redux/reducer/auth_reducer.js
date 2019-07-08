import { SET_CURRENT_USER, SET_LOADING } from "../actions/types";
const initialState = {
    isAuthenticated: false,
    user: {},
    isAdmin: false,
    loading: false
};

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {...state, loading: true };

        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload),
                isAdmin: parseInt(action.payload.role) === 1 ? true : false,
                loading: false
            };
        default:
            return state;
    }
}