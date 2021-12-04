import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import CheckoutPage from './pages/checkout/checkout.component.jsx'

import Header from './components/header/header.component.jsx'
import './App.css';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import {setCurrentUser} from './redux/user/user.actions'

import {selectCurrentUser} from './redux/user/user.selectors'


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
          <Route component={ShopPage} path="/shop" />
          <Route exact component={CheckoutPage} path="/checkout" />
          <Route 
            exact 
            render={()=> 
              this.props.currentUser ? (
                <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )
              } 
            path="/signin" 
          />
        </Switch>
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch)=> (
  {
    setCurrentUser: (user)=> dispatch(setCurrentUser(user))
  }
)



export default connect(mapStateToProps, mapDispatchToProps)(App);







/*
NOTE:
- user authenticated session persistance
- when firebase realizes that the authentication state has changed
this connection is always open as long as our application component is mounted on our DOM
- because it is an open subscription, it must be closed when unmount because don't want memory leaks
*/