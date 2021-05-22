import { ActionTypes } from "../constants/action-types"

const initialState={
    cartProducts:[]
}

export const cartReducer = (state=initialState , {type,payload}) => {       // action is replaced by {type,payload}
    switch(type) {
        case ActionTypes.SET_CART_PRODUCTS:
            return {...state, cartProducts: payload};
        case ActionTypes.REMOVE_CART_PRODUCTS:
            return {...state,cartProducts:[]};
        default:
            return state;
    }
}

