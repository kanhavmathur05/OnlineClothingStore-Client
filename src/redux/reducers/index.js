import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { orderHistoryReducer } from './orderHistoryReducer';
import { productReducer, selectedProductReducer } from './productReducer';
import { userReducer } from './userReducer';

const reducers = combineReducers({
    allProducts:productReducer,
    product:selectedProductReducer,
    user:userReducer,
    cartProducts:cartReducer,
    orderHistoryList:orderHistoryReducer,
})

export default reducers;