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
            
          surveysData: []
        }
    }

  componentDidMount() {
    const token = localStorage.getItem('ADMIN_TOKEN');
    const decoded = jwt_decode(token);
    this.setState({
      firstName: decoded.first_name,
      email: decoded.email,
      adminID: decoded.id,
      
    });

    localStorage.setItem('ADMIN_ID', decoded.id)
    this.getSurveys();

  };

  getSurveys() {
    const requestSurveys = {
      adminID: localStorage.getItem('ADMIN_ID')
    };
    
    getSurveys(requestSurveys);
    
  };


    render() {
        return (
          <div>

            {/* <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Dashboard
                </h1>
              </div>
              <div className=' item6 navbar-container'> */}
                <Navbar/>
              {/* </div>
            </div> */}

            <div className='profile-bg'>
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

                      <div className='survey-details'>
                      <p className='survey-title'>
                        Survey Title
                        <span className='survey-date'> 21/02/2021 </span>
                      </p>
                      </div>

                      <div className='buttons-row'> 
                        <button className='survey-btn'>Download Results</button>
                        <button className='survey-btn'>Preview</button>
                        <button className='survey-btn'>Edit</button>
                        <button className='survey-btn'>Delete</button>
                        <button className='survey-btn'>Copy</button>
                      </div>
                    </div>
                  </div>
              </div>
              </div>
              
          </div>
        </div>
        )
    }
}