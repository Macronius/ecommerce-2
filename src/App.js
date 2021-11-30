import React from 'react'
import {Route, Switch} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'

import Header from './components/header/header.component.jsx'
import './App.css';




function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={ShopPage} path="/shop" />
      </Switch>
    </div>
  );
}

export default App;
