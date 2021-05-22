import { ActionTypes } from "../constants/action-types"


export const userReducer = (state={} , {type,payload}) => {       // action is replaced by {type,payload}
    switch(type) {
        case ActionTypes.SET_LOGGEDIN_USER:
            return {...state,...payload};

        case ActionTypes.SET_USER_LOGOUT:
            return {};
        default:
            return state;
    }
}