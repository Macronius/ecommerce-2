//the base reducer that represents all of the state of the application

import {combineReducers} from 'redux'

import userReducer from './user/user.reducer.jsx'

export default combineReducers({
    user: userReducer,
})