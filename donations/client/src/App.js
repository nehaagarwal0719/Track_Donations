import React, { Component } from "react";
import Fundraiser from "./contracts/FundRaising.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  
async componentWillMount(){
   document.title = "Donation Tracker"
  await this.loadweb3()
  console.log(window.web3)
  await this.loadBlockchainData()
}

  
  
  render() {
    return (
      <div className="App">
        Donation Tracker
      </div>
    );
  }
}

export default App;
