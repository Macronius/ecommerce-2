import {createSelector} from 'reselect'

const selectCart = (state)=> state.cart

//createSelector
export const selectCartItems = createSelector(
    [selectCart],
    (cart)=> cart.cartItems
    // NOTE: because we used createSelector to make this selectCartItems selector, it is now a 'memoized selector'
    )
    
    
    //make a countItemsCart selector
    export const selectCartItemsCount = createSelector(
        [selectCartItems],
        (cartItems)=> cartItems.reduce( 
            (accumulatedQuantity, cartItem)=> accumulatedQuantity + cartItem.quantity,
            0
        )
    )



            //two types of selectors: 
// inputSelector - doesn't use createSelector
// outputSelector - does use inputSelector and createSelector to build itself
//inputSelector - gets the whole state are returns just a slice of it
//NOTE: gets the whole reducer-state and we just want the cart piece of it