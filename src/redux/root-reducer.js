//the base reducer that represents all of the state of the application

import {combineReducers} from 'redux'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
})