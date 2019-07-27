import {
    CREATE_ORDER,
    SET_ORDER_LOADING,
    GET_ERRORS,
    GET_ALL_ORDERS,
    FINISH_ORDER,
    GET_ORDERS_BY_ID,
    FINISH_ORDER_DETAIL,
    DELETE_ORDER
} from "./types";
import axios from "axios";

//loading
export const setOrderLoading = () => ({
    type: SET_ORDER_LOADING
});

// create order
export const createOrder = data => dispatch => {
    axios
        .post("/api/order/create", data)
        .then(res =>
            dispatch({
                type: CREATE_ORDER,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

// get all order
export const getOrders = () => dispatch => {
    dispatch(setOrderLoading());
    axios
        .get("/api/order/")
        .then(res => {
            dispatch({
                type: GET_ALL_ORDERS,
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

// get order by id
export const getOrderById = id => dispatch => {
    dispatch(setOrderLoading());
    axios
        .get(`/api/order/${id}`)
        .then(res => {
            dispatch({
                type: GET_ORDERS_BY_ID,
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

// finish order
export const finishOrder = (id, type) => dispatch => {
    const data = {
        id: id
    };
    axios
        .post("/api/order/finished", data)
        .then(res => {
            dispatch({
                type: type === "detail" ? FINISH_ORDER_DETAIL : FINISH_ORDER,
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

// delete order
export const deleteOrder = id => dispatch => {
    const data = { id: id };
    axios
        .post("/api/order/delete", data)
        .then(res => {
            dispatch({
                type: DELETE_ORDER,
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