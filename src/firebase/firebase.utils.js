import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyBTcI_VSUFO_YPDROp7X-95pTxdLW-qoyg",
    authDomain: "ecommerce2-crwn-db.firebaseapp.com",
    projectId: "ecommerce2-crwn-db",
    storageBucket: "ecommerce2-crwn-db.appspot.com",
    messagingSenderId: "232318358003",
    appId: "1:232318358003:web:bc77c3d3e87de14ac30286",
    measurementId: "G-B3MVRZRTNP"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //check if getting back a valid object (sign-in not sign-out)
    if(!userAuth) {
        return
    }  // console.log("userAuth: ", userAuth)

    //query inside firestore for the document to see if it already exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);  // console.log("userRef: ", userRef)

    //get the snapshot
    const snapShot = await userRef.get();    // console.log("snapShot: ", snapShot)

    if(!snapShot.exists) {
        //if doesnt exist, we want to create a piece of data there using userRef
        const {displayName, email} = userAuth
        const createdAt = new Date();    // timestamp when invoked
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        }catch(err) {
            console.log('error creating user: ', err.message)
        }
    }

    return userRef  // return the userRef because there is a chance it might be needed
}


//util to add shop.data collections
//NOTE: this goes in App.js because App only mounts once
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=> {

    // console.log(`objectToAdd: ${objectsToAdd}`)

    //NOTES:
    //create a collection using the collectionKey
    const collectionRef = firestore.collection(collectionKey);   // console.log(collectionRef)
    
    const batch = firestore.batch()
    objectsToAdd.forEach(  (obj)=> {
        // give a new document reference in this collection and randomly generate an id
        const newDocRef = collectionRef.doc();  // console.log(newDocRef)   
        batch.set(newDocRef, obj)
    })

    //NOTES:
    //fire off the batch call 
    //NOTE: returns a promise
    //NOTE: when commit succeeds, it will come back and resolve a 'void'/null value
    return await batch.commit()

}


//get the entire snapshot

export const convertCollectionsSnapshotToMap = (collectionsSnapshot)=> {
    const transformedCollection = collectionsSnapshot.docs.map( (docSnapshot)=> {
        const {title, items} = docSnapshot.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: docSnapshot.id,
            title,
            items
        }
    })

    return transformedCollection.reduce( (accumulator, collection)=> {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}



// firebase.initializeApp(config)

//export this out anywhere that will need authentication
export const auth = firebase.auth() 
export const firestore = firebase.firestore()

//GOOGLE AUTHENTICATION UTILITY: gives access to this new GoogleAuthProvider() class from the authentication library
const provider = new firebase.auth.GoogleAuthProvider()

//meaning: we always want to trigger the Google pop-up whenever we use this GoogleAuthProvider for authentication and sign-in
provider.setCustomParameters( {prompt: 'select_account'} ) 


export const signInWithGoogle = ()=> auth.signInWithPopup(provider)

export default firebase //in case we want the whole library