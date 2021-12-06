import React from 'react'
import './collection.styles.scss'

import {connect} from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import {selectShopCollection} from '../../redux/shop/shop.selectors'

const CollectionPage = ({collection})=> {
    const {title, items} = collection
    return(
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map( (item)=> <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

//NOTE: second argument is the props of the component that we're wrapping in the connect
const mapStateToProps = (state, ownProps)=> (
    {
        collection: selectShopCollection(ownProps.match.params.collectionId)(state)
    }
)

export default connect(mapStateToProps)(CollectionPage)