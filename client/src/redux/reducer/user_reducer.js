import {
    GET_USER,
    UPDATE_USER_INFORMATION_NAME,
    UPDATE_USER_INFORMATION_PASSWORD
} from "../actions/types";

const initialState = {
    user: {},
    success: false,
    updatePassword: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload.user,
                success: action.payload.success
            };
        case UPDATE_USER_INFORMATION_NAME:
            return {
                ...state,
                user: {...state.user, name: action.payload.user.user.name }
            };
        case UPDATE_USER_INFORMATION_PASSWORD:
            return {
                ...state,
                updatePassword: true
            };
        default:
            return state;
    }
}