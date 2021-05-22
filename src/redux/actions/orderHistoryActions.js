import { ActionTypes } from '../constants/action-types';

export const setOrderHistoryList=(orderHistoryList)=>{
    return {
        type: ActionTypes.SET_ORDER_HISTORY_LIST,
        payload: orderHistoryList,
    };
};

export const removeOrderHistoryProducts = () => {
    return {
        type: ActionTypes.REMOVE_ORDER_HISTROY_PRODUCTS,
        // payload:product,
    }
};