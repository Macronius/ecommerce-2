import React from 'react'
import './checkout-item.styles.scss'

//NOTE: bind the redux action to the component via 'connect'
import {connect} from 'react-redux'

import {clearItemFromCart, addItem, removeItem} from '../../redux/cart/cart.actions'


//NOTE: for props reference, see cart.actions (sends the entire item)
const CheckoutItem = ({cartItem, clearItem, addItem, removeItem})=> {

    const {name, imageUrl, price, quantity} = cartItem

    return(
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>

            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={()=> removeItem(cartItem) }>
                    &#10094;
                </div>
                    <span className="value">{quantity}</span>
                <div className="arrow" onClick={ ()=> addItem(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>

            <div 
                className="remove-button"
                onClick={()=> clearItem(cartItem)}
            >
                &#10005;
            </div>
        </div>
    )
}



const mapDispatchToProps = (dispatch)=> (
    {
        clearItem: (item)=> dispatch(clearItemFromCart(item)),
        addItem: (item)=> dispatch(addItem(item)),
        removeItem: (item)=> dispatch(removeItem(item))
    }
)
/*
QUESTIONS:
    - where did the name 'clearItem' come from?
    - is clearItem now the function (aka dispatched action)?
*/

export default connect(null, mapDispatchToProps)(CheckoutItem)