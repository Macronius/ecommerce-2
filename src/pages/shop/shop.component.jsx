import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateCollections} from '../../redux/shop/shop.actions'

import WithSpinner from '../../components/with-spimmer/with-spiner.component'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
        //NOTE: it is implied that constructor and super are needed
    }

    unsubscribeFromSnapshot = null

    // componentDidMount() {
    //     const {updateCollections} = this.props // HUH ?
    //     const collectionRef = firestore.collection('collections')

    //     this.unsubscribeFromSnapshot = collectionRef.onSnapshot( async (snapshot)=> {
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //         updateCollections(collectionsMap)
    //         this.setState({loading: false})
    //     })
    // }
    componentDidMount() {
        const {updateCollections} = this.props
        const collectionRef = firestore.collection('collections')

        // fetch(`https://firestore.googleapis.com/v1/projects/ecommerce2-crwn-db/databases/(default)/documents/collections`)
        //     .then( response=> response.json())
        //     .then( collections=> console.log(collections))

        collectionRef.get().then(snapshot=> {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionsMap)
            this.setState( {loading: false})
        })
    }

    render() {
        const {match} = this.props
        const {loading} = this.state

        return(
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={
                        (props)=> <CollectionOverviewWithSpinner  isLoading={loading} {...props} />
                    } 
                />
                <Route 
                    path={`${match.path}/:collectionId`}
                    render={
                        (props)=> <CollectionPageWithSpinner isLoading={loading} {...props} />
                    }
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch=> (
    {
        updateCollections: (collectionsMap)=> 
            dispatch(updateCollections(collectionsMap))
    }
)


export default connect(null, mapDispatchToProps)(ShopPage)