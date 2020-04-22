import React  , {Component} from 'react';
import Web3 from 'web3';


class Profile1 extends Component{

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
     const web3 = window.web3
   let latestBlock = await web3.eth.getBlock('latest')
    console.log('latestBlock',latestBlock)
    this.setState({
      blockNumber:latestBlock.number
    })
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
      funds:[],
      fundraisersCount:0,
      loading : true
    }
  }


 render(){
  return(
    <div className="container">
        <div className="row my-2">
            <div className="col-lg-8 order-lg-2">
                <ul className="nav nav-tabs navbar-light">
                

                  {this.state.account != "0xc55961b8eaD792670E5393418950BE7597d521ED"?
                   <li className="nav-item">
                   <a href="" data-target="#funddetails" class="text-dark" data-toggle="tab" class="nav-link lead">Fund Details</a>
                   </li>:null}

                   {this.state.account != "0xc55961b8eaD792670E5393418950BE7597d521ED"?
                   <li className="nav-item">
                   <a href="" data-target="#donationdetails" class="text-dark" data-toggle="tab" class="nav-link lead">Donation Details</a>
                   </li>:null}

                  {this.state.account != "0xc55961b8eaD792670E5393418950BE7597d521ED"? 
                   <li className="nav-item">
                   <a href="" data-target="#spend" data-toggle="tab" class="nav-link lead"> Spend </a>
                   </li>:null}

                    {this.state.account == "0xc55961b8eaD792670E5393418950BE7597d521ED"?
                   <li className="nav-item">
                   <a href="" data-target="#verify_fund" data-toggle="tab" class="nav-link lead"> Verify Fund </a>
                   </li>:null}

               </ul>

               <div className="tab-content py-4">
                    <div class="tab-pane active" id="funddetails">
                        
                           {this.props.funds.map((fund,key)=>{
                            if(this.state.account==fund.reciever){
                              return(
                                <div>
                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund ID</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.f_id}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund Name</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.name}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund Description</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.des}</label>
                                    </div>

                                     <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Amount to be raised</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.amount/10**18}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Amount recieved</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.recieved}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund Status</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.status==true?<p>Approved</p>:<p>Not Approved</p>}</label>
                                    </div>


                                </div>
                                );
                              }})}

               
                    </div>

                    <div class="tab-pane" id="donationdetails">
                      lets donate
                    </div> 

                    <div class="tab-pane" id="spend">
                   lets spend
                    </div> 


                  <div class="tab-pane" id="verify_fund">

                           {this.props.funds.map((fund,key)=>{
                            if(fund.status==false && fund.f_id>=1){
                              return(
                                <div>
                                 <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund ID</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.f_id}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Funf Name</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.name}</label>
                                    </div>

                                    <div class="form-group row">
                                      <label class="col-lg-4 col-form-label form-control-label">Fund Status</label>
                                      <label className="col-lg-8 col-form-label form-control-label">{fund.status==true?<p>approved</p>:<p>not</p>}</label>
                                    </div>


                                </div>
                                );
                              }})}
  

                          <div  class="form-group row">  
                                <form onSubmit={(event) => {
                                event.preventDefault()
                                const id = this.fundId.value
                                 this.props.approvefund(id)
                                }}>
                                <div className="form-group row">
                                <div  class="col-lg-12">
                                <input
                                id="fundId"
                                type="text"
                                ref={(input) => { this.fundId = input }}
                                class="form-control m-2"
                                placeholder="Fund Id"
                                required />
                                </div>
                                </div>
                                <div class="col-lg-12 text-left">
                                <button type="submit" className=" col-lg-8 button btn-block">Verify Fund</button>
                                </div>
                                </form>
                          </div>   
                </div>
      </div>
    </div>  
  </div>
  </div>
  
      );

}
}

export default Profile1