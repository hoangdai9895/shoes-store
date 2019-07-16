import { GET_CART_QUANTITY } from '../actions/types'
const initialState = {
    quantity: 0
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CART_QUANTITY:
            return {...state, quantity: action.payload }
        default:
            return state
    }
}