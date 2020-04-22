import React  , {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Contribute from './Contribute.js'
import Details from './details.js'

class DonateMain extends Component{

  constructor (props){
    super(props) 
    this.state ={
      account:'',
      loading : true,
    
    }
  }


  render()
  {
    return(
      
      <Router>
      
          <Route path="/contribute" component={Contribute}/>
          <Route path="/details" component={Details}/>

     <div class="container">
     <h1>Fund Details</h1>
       {this.props.funds.map((fund,key)=>{
        if(fund.f_id>0){
                    return(
       
      
        <div class="card-deck col-lg-offset-4 ">
             <div class="card mr-5 ml-5 mt-5 mb-5 one" >
                <div class="card-body bg-light">
                      
                      <div class="card-text ">
                       <label class="col-lg-4" >Fund ID:</label>
                      <label class="col-lg-4" >{fund.f_id}</label>
                      </div>

                      <div>
                       <label class="col-lg-4" >Name:</label>
                      <label class="col-lg-4" >{fund.name}</label>
                      </div>

                       <div>
                       <label class="col-lg-4" >Description:</label>
                      <label class="col-lg-4"  >{fund.des}</label>
                      </div>

                       <div>
                       <label class="col-lg-4" >Amount to be raised:</label>
                      <label class="col-lg-4" >{fund.amount/10**18}</label>
                      </div>

                       <div>
                       <label class="col-lg-4" >Amount recieved:</label>
                      <label class="col-lg-4" >{fund.recieved}</label>
                      </div>
              </div>
               <div class="card-footer">
                <div class="row">
                  <div class="col-lg-1"></div>
                  
                  <div class="col-lg-7">
                   <button>
                             <Link class="nounderline text-dark" to={'/details/'+fund.id} >
                                  Details
                            </Link>
                   </button>
                  </div> 

                   <div class="col-lg-4">
                   {fund.status == true
                          ? <button>
                            <Link class="nounderline text-dark" to={'/contribute/'+ fund.id} >
                                Contribute
                            </Link>
                          </button>
                          :null
                         }
                    </div> 
                 </div>
              


                     
                      
                 
              </div>
     </div>
   </div>  

   );
                 }})}

      </div>
      </Router>
    );
  }
}


export default DonateMain;
