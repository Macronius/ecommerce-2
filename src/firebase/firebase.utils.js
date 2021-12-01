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

firebase.initializeApp(config)

//export this out anywhere that will need authentication
export const auth = firebase.auth() 

export const firestore = firebase.firestore()

//GOOGLE AUTHENTICATION UTILITY: gives access to this new GoogleAuthProvider() class from the authentication library
const provider = new firebase.auth.GoogleAuthProvider()

//meaning: we always want to trigger the Google pop-up whenever we use this GoogleAuthProvider for authentication and sign-in
provider.setCustomParameters( {prompt: 'select_account'} ) 


export const signInWithGoogle = ()=> auth.signInWithPopup(provider)

export default firebase //in case we want the whole library