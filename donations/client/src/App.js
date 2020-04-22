import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import Home from './components/Home';
import AddFund from  './components/AddFund';
import Donate from './components/Donate';
import Profile from './components/Profile';
import Details from './components/details';
import Contribute from './components/Contribute';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        
         <Route exact path="/" component={Home} />
         <div className="container">
         <Route exact path="/fund" component={AddFund} />
         <Route exact path="/donate" component={Donate} />
         <Route exact path="/profile" component={Profile} />
         <Route exact path="/details/" component={Details} />
         <Route exact path="/Contribute/" component={Contribute} />
        </div>
        </div>
      </Router>
    )
  }
}

export default App