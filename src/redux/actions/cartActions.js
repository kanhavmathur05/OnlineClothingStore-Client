import { ActionTypes } from '../constants/action-types';

export const setCartProducts=(cartProducts)=>{
    return {
        type: ActionTypes.SET_CART_PRODUCTS,
        payload: cartProducts,
    };
};

export const removeCartProducts = () => {
    return {
        type: ActionTypes.REMOVE_CART_PRODUCTS,
        // payload:product,
    }
};