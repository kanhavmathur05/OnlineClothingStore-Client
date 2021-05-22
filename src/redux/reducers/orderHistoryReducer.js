import { ActionTypes } from "../constants/action-types"

const initialState={
    orderHistoryList:[]
}

export const orderHistoryReducer = (state=initialState , {type,payload}) => {       // action is replaced by {type,payload}
    switch(type) {
        case ActionTypes.SET_ORDER_HISTORY_LIST:
            return {...state, orderHistoryList: payload};
        case ActionTypes.REMOVE_ORDER_HISTROY_PRODUCTS:
            return {...state,orderHistoryList:[]};
        default:
            return state;
    }
}

