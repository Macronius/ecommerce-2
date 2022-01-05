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


/* 
NOTE: the shop component will be the one that is able to know whether or not the loading state
    that we're considering is actually finished because the shop component is the one that receives and makes the call to update our reducer after getting the data back from our backend, then due to this reason, the logic for determining the withSPinner must go here on the shop.component
*/