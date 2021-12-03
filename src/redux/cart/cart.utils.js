


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