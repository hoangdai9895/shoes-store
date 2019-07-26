import axios from "axios";
import {
    SET_PRODCUTs_LOADING,
    GEL_ALL_PRODUCTS,
    GET_ERRORS,
    GET_FILLTER,
    GET_PRODUCT_FILTER,
    ADD_PRODUCT,
    GET_DETAIL,
    GET_CART_QUANTITY,
    DELETE_PRODUCT,
    UPDATE_PRODUCT
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

export const getProductDetail = (id) => dispatch => {
    dispatch(setProductsLoading());
    const data = {
        id: id
    }
    axios.post(`/api/product/shop/${id}`, data).then(res => {
        dispatch({
            type: GET_DETAIL,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}

// get cart quantity
export const getCartQuantity = (quantity) => ({
    type: GET_CART_QUANTITY,
    payload: quantity
})

// delete product
export const deleteProduct = (id, listImages) => dispatch => {
    const data = {
        id: id,
        listImages: listImages
    }
    axios.post('/api/product/delete', data).then(res => {
        dispatch({
            type: DELETE_PRODUCT,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// update product
export const updateProduct = data => dispatch => {
    axios.post('/api/product/update', data).then(res => {
        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}