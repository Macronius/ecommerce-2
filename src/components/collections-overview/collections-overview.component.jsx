import React from 'react'
import './collections-overview.styles.scss'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview.component'


const CollectionsOverview = ({collections})=> {
    console.log(collections)
    return(
    <div className="collections-overview">
        {
            collections.map( ({id, ...otherCollectionProps})=> (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
)
}

const mapStateToProps = createStructuredSelector(
    {
        collections: selectCollectionsForPreview
    }
)

export default connect(mapStateToProps)(CollectionsOverview)