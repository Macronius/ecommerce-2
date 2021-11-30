import React from 'react'
import HomePage from './pages/homepage/homepage.component.jsx'
import './App.css';
import {Route, Switch} from 'react-router-dom'



const HatsPage = ()=> (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path="/" />
        <Route exact component={HatsPage} path="/hats" />
      </Switch>
    </div>
  );
}

export default App;
