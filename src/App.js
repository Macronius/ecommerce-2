import React from 'react'
import {Route, Switch} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import Header from './components/header/header.component.jsx'
import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'





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
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=> {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        //NOTE: we want this because we want to check if our database has updated at that reference with any new data

        //PRO: what this method will do is that the moment it instantiates, meaning that the moment our code runs it, it will still send us a snapshot object representing the data that is currently stored in our database
        //aka: subscribe (listen) to this userRef for any changes to that data
        userRef.onSnapshot( snapShot=> {
          // console.log("snapShot: ", snapShot) //NOTE: this has the id
          // console.log("snapShot.data(): ", snapShot.data()) //this has everything else we need
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log("this.state: ", this.state)
        })
      }
      //NOTE: this sets state's currentUser value to NULL (if the user ever logs out)
      this.setState({currentUser: userAuth})
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