


export const addItemToCart = (cartItems, cartItemToAdd)=> {
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToAdd.id)

    if(existingCartItem) {
        return cartItems.map( (cartItem)=> 
            cartItem.id === cartItemToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity +1}
                : cartItem
        )
    }

    //if cartItem is not already found in the array, return new array with all existing plus new
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}



export const removeItemFromCart = (cartItems, cartItemToRemove)=> {
    const existingCartItem = cartItems.find( 
        (cartItem)=> cartItem.id === cartItemToRemove.id
    )

    console.log(`cartItemToRemove: ${cartItemToRemove}`)
    console.log(`existingCartItem: ${existingCartItem}`)

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem)=> cartItem.id !== cartItemToRemove.id
        )
        //QUESTION: why use cartItemToRemove over existingCartItem?
    }

    return cartItems.map(
        (cartItem)=> cartItem.id === cartItemToRemove.id
            ? {...cartItem, quantity: cartItem.quantity -1}
            : cartItem
    )
}