import SHOP_DATA from './shop.data'


const INITIAL_STATE = {
    collections: SHOP_DATA,
}


//reducer hook
const shopReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type) {
        default: 
            return state
    }
}

export default shopReducer

//DONT FORGET TO PULL THIS INTO THE ROOT REDUCER