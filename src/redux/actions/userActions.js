import { ActionTypes } from '../constants/action-types';

export const setLoginUser=(user)=>{
    return {
        type: ActionTypes.SET_LOGGEDIN_USER,
        payload: user,
    };
};

export const setUserLogout=()=>{
    return {
        type:
            ActionTypes.SET_USER_LOGOUT,
            // payload:{},
    }
}