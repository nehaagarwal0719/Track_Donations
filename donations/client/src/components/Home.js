import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import AddFund from './AddFund.js';
import Donate from './Donate.js';
import Profile from './Profile.js';
import Web3 from 'web3';
import fundraising from '../contracts/FundRaising.json';

class Home extends Component {

  render() {
    return (
      
     <Router>
		    <div>
		      <Route path="/fund" component={AddFund}/>
		      <Route path="/donate" component={Donate}/>
		      <Route path="/profile" component={Profile}/>

		     <Link class="nounderline text-dark" to={'/profile'}><button class="profile"> Profile</button></Link>
		    <h1 class="text-center home-n"> Donation Tracker </h1>
		    
		    <div class="container h-100 home-d">
		    <div class="d-flex h-100 text-center align-items-center">
		    <div class="w-100 text-white">
		        
		      <div class="row">

		        <div class="col-sm-6  ">
		            <div class="card bg-light">
		                <div class="card-block">
		                  <h1 class="card-header text-center text-muted as"> 
			                  <Link class="nounderline text-dark" to={'/fund'}>Add Funds</Link>
		                  </h1>
		                </div>
		            </div>
		        </div>

		         <div class="col-sm-6 ">
		          <div class="card">
		            <div class="card-block">
		              <h1 class="card-header text-center text-muted as"> 
		                  <Link class="nounderline text-dark" to={'/donate'} >Donate </Link>
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