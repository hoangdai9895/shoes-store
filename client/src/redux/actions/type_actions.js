import axios from "axios";
import { SET_LOADING_TYPE, GET_ALL_TYPE, GET_ERRORS } from "./types";

export const setLoadingType = () => ({
    type: SET_LOADING_TYPE
});

export const getAllType = () => dispatch => {
    dispatch(setLoadingType());
    axios
        .get("/api/type/")
        .then(res => {
            dispatch({
                type: GET_ALL_TYPE,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};