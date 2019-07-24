import axios from "axios";
import {
    GET_USER,
    GET_ERRORS,
    UPDATE_USER_INFORMATION_NAME,
    UPDATE_USER_INFORMATION_PASSWORD
} from "./types";

export const getUser = id => dispatch => {
    const data = { id: id };
    axios
        .post("/api/user", data)
        .then(res => {
            // console.log(res.data);
            dispatch({ type: GET_USER, payload: res.data });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

export const updateInfo = (id, element, type, currentpassword) => dispatch => {
    if (type === "name") {
        const data = { id: id, name: element };
        axios
            .post("/api/user/name", data)
            .then(res => {
                // console.log()
                dispatch({ type: UPDATE_USER_INFORMATION_NAME, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: GET_ERRORS, payload: err });
            });
    } else {
        const data = {
            id: id,
            newpassword: element,
            currentpassword: currentpassword
        };
        axios
            .post("/api/user/password", data)
            .then(res => {
                dispatch({
                    type: UPDATE_USER_INFORMATION_PASSWORD,
                    payload: true
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    }
};