import React, { Component } from 'react';
import Web3 from 'web3';
import fundraising from '../contracts/FundRaising.json';
import FundMain from './FundMain';

class AddFund extends Component{

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
      const fund= await fundraiser.methods.fundraisers(i).call()
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

  render()
  {
    console.log('neha')
    return(
   <div class ="container">
      <div class="row">
        <FundMain funds ={this.state.funds} 
        addFund={this.addFund}
        
        />
        </div>
    </div>
      );
  }
}

export default AddFund;
