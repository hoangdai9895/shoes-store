import {
    GET_ALL_BRANDS,
    GET_ERRORS,
    SET_BRANDS_LOADING,
    ADD_BRAND
} from "./types";
import axios from "axios";

export const setBrandsLoading = () => ({
    type: SET_BRANDS_LOADING
});

// get all brand
export const getBrands = () => dispatch => {
    dispatch(setBrandsLoading());
    axios
        .get("/api/brand")
        .then(res => {
            dispatch({
                type: GET_ALL_BRANDS,
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

// add brand
export const addBrand = newBrand => dispatch => {
    axios
        .post("/api/brand/create", newBrand)
        .then(res => {
            dispatch({
                type: ADD_BRAND,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};