//the base reducer that represents all of the state of the application

import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'  // window.localStorage
//import sessionStorage from 'redux-persist/lib/session-storage' //just a guess url, see doc

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

//define a new persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //an array containing string names of any reducers we want to store
}

const rootReducer = combineReducers(
    {
        user: userReducer,
        cart: cartReducer,
        directory: directoryReducer,
        shop: shopReducer,
    }
)



export default persistReducer(persistConfig, rootReducer)