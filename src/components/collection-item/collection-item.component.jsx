import React from 'react'
import './collection-item.styles.scss'

import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import {addItem} from '../../redux/cart/cart.actions'

const CollectionItem = ({item, addItem})=> {

    const {name, imageUrl, price} = item
    
    return(
        <div className="collection-item">
            <div 
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="collection-footer">
                <div className="name">{name}</div>
                <div className="price">{price}</div>
            </div>
            <CustomButton 
                onClick={ ()=> addItem(item)}
                inverted
            >
                 Add to Cart 
            </CustomButton>
        </div>
    )
}




const mapDispatchToProps = (dispatch)=> (
    {
        addItem: (item)=> dispatch(addItem(item))
    }
)

export default connect(null, mapDispatchToProps)(CollectionItem)