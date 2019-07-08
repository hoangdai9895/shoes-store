import { SET_CURRENT_USER, GET_ERRORS, SET_LOADING } from "./types";
import axios from "axios";
import setAuthToken from "../../components/common/SetAuthToken";
import jwt_decode from "jwt-decode";

export const login = userData => dispatch => {
    axios
        .post("/api/user/login", userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            // console.log(decoded);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            // console.log(err.response.data, err);
            dispatch(setLoading());
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = decoded => {
    // console.log(decoded);
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};