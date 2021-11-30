import React from 'react'
import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import './App.css';
import {Route, Switch} from 'react-router-dom'




function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={ShopPage} path="/shop" />
      </Switch>
    </div>
  );
}

export default App;
