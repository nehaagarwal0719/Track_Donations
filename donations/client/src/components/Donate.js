import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import AddFund from './AddFund.js';
import Donate from './Donate.js';
import Web3 from 'web3';
import fundraising from '../contracts/FundRaising.json';

class Home extends Component {

  
async componentWillMount(){
  await this.loadweb3()
  console.log(window.web3)
  await this.loadBlockchainData()
}


async loadweb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = fundraising.networks[networkId]
    if(networkData){ 
     const fundraiser = new web3.eth.Contract(fundraising.abi,networkData.address)
     this.setState({fundraiser})

     const fundraisersCount = await fundraiser.methods.fundraisersCount().call()
     this.setState({fundraisersCount})
     for(var i=1;i<=fundraisersCount;i++){
      const fund= await fundraiser.methods.props(i).call()
      this.setState({
        funds:[...this.state.funds,fund]
      })   
    }

     this.setState({loading:false})
     //console.log(this.state.bids)
      }
    else{
    window.alert("Contract not deployed to the detected network");
  }
}


  constructor (props){
    super(props)
   
    this.state ={
      account: '',
      funds:[],
      fundraisersCount:0,
      loading : true
    }

   this.addFund = this.addFund.bind(this);
   
  }


addFund(name,amount,des) {

    this.setState({ loading: true })
    this.state.fundraiser.methods.addFund(name,amount,des).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })

  }

  render() {
    
    return (
      
     <Router>
        <div>
          <Route path="/fund" component={AddFund}/>
          <Route path="/donate" component={Donate}/>

        
        <h1 class="text-center home-n"> Donation Tracker </h1>
      
        <div class="container h-100 home-d">
        <div class="d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
            
          <div class="row">

            <div class="col-sm-6  ">
                <div class="card bg-light">
                    <div class="card-block">
                      <h1 class="card-header text-center text-muted as"> 
                        <Link class="nounderline text-dark" to={'/AddFund'}>Add Funds</Link>
                      </h1>
                    </div>
                </div>
            </div>

             <div class="col-sm-6 ">
              <div class="card">
                <div class="card-block">
                  <h1 class="card-header text-center text-muted as"> 
                      <Link class="nounderline text-dark" to={'/AddDonate'} >Donate </Link>
                  </h1>
                </div> 
              </div>
            </div>

          </div>

          </div>
        </div>
      </div>

  
      </div>
    </Router>

     )
    }
 } 
  

export default Home;  