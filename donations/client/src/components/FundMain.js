import React , {Component} from 'react';
import Web3 from 'web3';

class FundMain extends Component{

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
}
  constructor (props){
    super(props)
    this.state ={
      account: '',
      loading : true
    }
  }


  render()
  {
      
    return(
      <div id="content">
      <div class="container">
        <div class="row">
           <h1>Add Fund Details</h1>
          <div class="col-lg-6 spacer">
         <form onSubmit={(event) => {
                event.preventDefault()
                const name = this.fundName.value
                const des = this.fundDes.value
                const amount = window.web3.utils.toWei(this.fundPrice.value.toString(), 'Ether')

                this.props.addFund(name,amount,des)
          }}>
                <div className="form-group mr-sm-2">
                           <input
                              id="fundName"
                              type="text"
                              ref={(input) => { this.fundName = input }}
                              className="form-control mt-3"
                              placeholder="Name"
                              required />
                              <input
                              id="fundDes"
                              type="text"
                              ref={(input) => { this.fundDes = input }}
                              className="form-control mt-3"
                              placeholder="Description"
                              required />
                              <input
                              id="fundPrice"
                              type="text"
                              ref={(input) => { this.fundPrice = input }}
                              className="form-control mt-3"
                              placeholder="Price"
                              required />
                  </div>          
                  <button type="submit" className="button btn-lg btn-block">AddFund</button>
          </form>
          </div>

          </div>      
         </div>
         </div>
    
    );
  }
}

export default FundMain;