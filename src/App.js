import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import Header from './components/header/header.component.jsx'
import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

//ACTIONS
import {setCurrentUser} from './redux/user/user.actions'



class App extends React.Component {

  //NOTE: lines 30-42 - this is pretty much how we handle our application being aware of any off-changes on Firebase
  unsubscribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=> {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot( snapShot=> {
          setCurrentUser(
            {
              id: snapShot.id,
              ...snapShot.data()
            }
          )
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    //close the subscription
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact component={HomePage} path="/" />
          <Route exact component={ShopPage} path="/shop" />
          <Route exact component={SignInAndSignUpPage} path="/signin" />
        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch)=> (
  {
    setCurrentUser: (user)=> dispatch(setCurrentUser(user))
  }
)

export default connect(null, mapDispatchToProps)(App);







/*
NOTE:
- user authenticated session persistance
- when firebase realizes that the authentication state has changed
this connection is always open as long as our application component is mounted on our DOM
- because it is an open subscription, it must be closed when unmount because don't want memory leaks
*/