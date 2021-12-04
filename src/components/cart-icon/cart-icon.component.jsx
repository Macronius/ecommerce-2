import React from 'react'
import './cart-icon.styles.scss'

import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'

import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors.js'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'


const CartIcon = ({toggleCartHidden, itemCount})=> (
    <div 
        className="cart-icon" 
        onClick={toggleCartHidden}
    >
        <ShoppingIcon className="shopping-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
)

//ONE WAY TO DO IT
// const mapStateToProps = ({cart: {cartItems}})=> (
//     {
//         itemCount: cartItems.reduce((accumulatedQuantity, cartItem)=> accumulatedQuantity + cartItem.quantity , 0)
//     }
// )

//SELECTOR WAY TO DO IT
const mapStateToProps = createStructuredSelector(
    {
        itemCount: selectCartItemsCount,
    }
)


const mapDispatchToProps = (dispatch)=> (
    {
        toggleCartHidden: ()=> dispatch(toggleCartHidden())
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)