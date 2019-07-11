import axios from "axios";
import {
    SET_PRODCUTs_LOADING,
    GEL_ALL_PRODUCTS,
    GET_ERRORS,
    GET_FILLTER,
    GET_PRODUCT_FILTER,
    ADD_PRODUCT
} from "./types";

export const setProductsLoading = () => {
    return {
        type: SET_PRODCUTs_LOADING
    };
};

export const getAllProdcuct = () => dispatch => {
    dispatch(setProductsLoading());
    axios
        .get("/api/product")
        .then(res => {
            dispatch({
                type: GEL_ALL_PRODUCTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: null
            });
        });
};

export const getProductFilter = (
    skip,
    limit,
    filters,
    previousState = []
) => dispatch => {
    const data = {
        limit,
        skip,
        filters
    };
    dispatch(setProductsLoading());
    axios.post("/api/product/shop", data).then(res => {
        // console.log(res.data);
        dispatch({
            type: GET_PRODUCT_FILTER,
            payload: res.data
        });
    });
};

export const getFilter = filters => {
    return {
        type: GET_FILLTER,
        payload: filters
    };
};

export const addProduct = data => dispatch => {
    axios
        .post("/api/product/create", data)
        .then(res => {
            dispatch({
                type: ADD_PRODUCT,
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