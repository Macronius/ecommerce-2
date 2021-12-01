import React from 'react'
import {Route, Switch} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import Header from './components/header/header.component.jsx'
import './App.css';

import {auth} from './firebase/firebase.utils'





class App extends React.Component {

  constructor() {
    super()

    //store the state of the user in the app.js's state
    this.state = {
      currentUser: null,
    }
  }

  //NOTE: lines 30-42 - this is pretty much how we handle our application being aware of any off-changes on Firebase
  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( user=> {
      this.setState( {currentUser: user} )
      console.log(user)
    })
  }

  componentWillUnmount() {
    //close the subscription
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact component={HomePage} path="/" />
          <Route exact component={ShopPage} path="/shop" />
          <Route exact component={SignInAndSignUpPage} path="/signin" />
        </Switch>
      </div>
    );
  }
}

export default App;


/*
NOTE:
- user authenticated session persistance
- when firebase realizes that the authentication state has changed
this connection is always open as long as our application component is mounted on our DOM
- because it is an open subscription, it must be closed when unmount because don't want memory leaks
*/