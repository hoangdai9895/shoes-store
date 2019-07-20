import { GET_ALL_ORDERS, SET_ORDER_LOADING, FINISH_ORDER, GET_ORDERS_BY_ID, FINISH_ORDER_DETAIL, DELETE_ORDER } from '../../redux/actions/types'

const initialState = {
    list: [],
    order: {},
    loading: false,
    success: false
}

export default function(state = initialState, action) {

    switch (action.type) {
        case SET_ORDER_LOADING:
            return {...state, loading: true }
        case GET_ALL_ORDERS:
            return {...state, list: action.payload, loading: false }
        case GET_ORDERS_BY_ID:
            return {...state, order: action.payload.order[0], loading: false, success: true }
        case FINISH_ORDER:
            let newList = [...state.list];
            for (let key in newList) {
                if (newList[key]._id === action.payload.orderId) {
                    newList[key].isFinished = true
                }
            }
            return {...state, list: newList }
        case FINISH_ORDER_DETAIL:
            return {...state, order: {...state.order, isFinished: true } }
        case DELETE_ORDER:
            return {...state, list: state.list.filter(item => item._id !== action.payload.orderId) }
        default:
            return {...state }
    }
}