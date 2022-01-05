import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    collections: null,
}


//reducer hook
const shopReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state, 
                collections: action.payload
            }
        default: 
            return state
    }
}

export default shopReducer

//DONT FORGET TO PULL THIS INTO THE ROOT REDUCER