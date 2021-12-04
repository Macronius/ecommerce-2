import React from 'react'
import './checkout-item.styles.scss'


//NOTE: for props reference, see cart.actions (sends the entire item)
const CheckoutItem = ({cartItem: {name, imageUrl, price, quantity}})=> {

    return(
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <div className="remove-button">&#10005;</div>
        </div>
    )
}

export default CheckoutItem