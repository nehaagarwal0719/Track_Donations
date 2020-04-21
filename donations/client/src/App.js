import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Home from './components/Home';
import AddFund from  './components/AddFund';
import Donate from './components/Donate';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        
         <Route exact path="/" component={Home} />
         <div className="container">
         <Route exact path="/fund" component={AddFund} />
         <Route exact path="/donate" component={Donate} />
        </div>
        </div>
      </Router>
    )
  }
}

export default App