import React  , {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from "react-router-dom";


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
      
     
     <div class="container">
     <h1>Fund Details</h1>
       {this.props.funds.map((fund,key)=>{
        
                    return(
       
      
        <div class="card-deck col-lg-offset-4 ">
             <div class="card mr-5 ml-5 mt-5 mb-5 one" >
                <div class="card-body bg-light">
                      
                      <div class="card-text ">
                       <label class="col-lg-4" >Fund ID:</label>
                      <label class="col-lg-4" >{fund.f_id.toString()}</label>
                     
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
         
     </div>
   </div>  

   );
                   })}

      </div>
    );
  }
}


export default DonateMain;
