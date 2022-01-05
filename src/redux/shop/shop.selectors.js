import {createSelector} from 'reselect'

import memoize from 'lodash.memoize'

//declare initial input selector
const selectShop = (state)=> state.shop

// const COLLECTION_ID_MAP = {
//     hats: 1, 
//     sneakers: 2, 
//     jackets: 3, 
//     womens: 4,
//     mens: 5,
// }


export const selectShopCollections = createSelector(
    [selectShop],
    (shop)=> shop.collections
)


//this selector will convert the object into an array
export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections)=> collections ? Object.keys(collections).map( (key)=> collections[key]) : []
)


export const selectShopCollection = memoize((collectionUrlParam)=> 
    createSelector(
        [selectShopCollections],
        (collections)=> collections ? collections[collectionUrlParam] : null
    )
)