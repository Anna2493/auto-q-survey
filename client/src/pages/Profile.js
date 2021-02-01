import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getSurveys } from '../BackendFunctions';

//TODO change token expiration
export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            email: '',
            adminID: '',
        }
    }

  componentDidMount() {
    const token = localStorage.getItem('adminToken');
    const decoded = jwt_decode(token);
    this.setState({
      firstName: decoded.first_name,
      email: decoded.email,
      adminID: decoded.id,
      
    });

    localStorage.setItem('adminID', decoded.id)
    this.get();

  };

  get() {
    const requestSurveys = {
      adminID: localStorage.getItem('adminID')
    }
    getSurveys(requestSurveys)
      .then(res => {
        console.log(res)
      })
  };

    render() {
        return (
          <div>

            <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Dashboard
                </h1>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            <div className='center'>
            <div className='dashboard-grid-container'>
            <div><h1 className='item7 container-heading'>Profile</h1></div>  

              <div className='item8 profile-content-container'>
                <div className='profile-container'>
                <div><h2 className='name-text'>{this.state.firstName}</h2></div> 
                  <div>
                    <Link to={"/CreateSurvey_Step1"}>
                      <button className="profile-btn">New Survey</button>
                    </Link>
                  </div>   
                <div><button className='profile-btn'>Change Password</button></div> 
                <div><button className='profile-btn'>Edit Avatar</button></div> 
                <div><button className='profile-btn'>Delete Account</button></div> 
                </div>
              </div>

              <div><h1 className='item7 container-heading'>Surveys</h1></div>
                <div className='item10 profile-content-container'>
                  <div className='all-surveys-container'>
                    <div className='survey-container'>
                      <h2>{this.state.firstName}</h2>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}