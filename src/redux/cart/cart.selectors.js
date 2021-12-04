import {createSelector} from 'reselect'

const selectCart = (state)=> state.cart


export const selectCartItems = createSelector(
    [selectCart],
    (cart)=> cart.cartItems
)
    
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems)=> cartItems.reduce( 
        (accumulatedQuantity, cartItem)=> accumulatedQuantity + cartItem.quantity,
        0
    )
)

export const selectCartHidden = createSelector(
    [selectCart], (cart)=> cart.hidden
)



            //two types of selectors: 
// inputSelector - doesn't use createSelector
// outputSelector - does use inputSelector and createSelector to build itself
//inputSelector - gets the whole state are returns just a slice of it
//NOTE: gets the whole reducer-state and we just want the cart piece of it