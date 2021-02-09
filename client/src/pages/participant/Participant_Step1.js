import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// import { getSurveys } from '../BackendFunctions';

export default class Participant_Step1 extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyName: 'This is test survey name',
            surveyDescription: 'This is test survey description that will describe the purpose of the survey and addiitonal information regarding the survey',
            privacyNotice: 'This is privacy notice and participant must agree to its terms in order to proceed to the next stage',
            adminName: 'Admin Name',
            adminEmail: 'admin@gmail.com',

        }
    }

  componentDidMount() {
    // const token = localStorage.getItem('ADMIN_TOKEN');
    // const decoded = jwt_decode(token);
    // this.setState({
    //   firstName: decoded.first_name,
    //   email: decoded.email,
    //   adminID: decoded.id,
      
    // });

    // localStorage.setItem('ADMIN_ID', decoded.id)
    // this.get();

  };

//   get() {
//     const requestSurveys = {
//       adminID: localStorage.getItem('ADMIN_ID')
//     }
//     getSurveys(requestSurveys)
//       .then(res => {
//         console.log(res)
//       })
//   };

    render() {
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Survey Details
                </h1>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            

            <div className='center-2'>
                <p className='headings'>Survey Name</p>
                
                <p className='survey-name'>{this.state.surveyName}</p>
                
                <p className='headings'>Survey Description</p>

                <div className='description-container'>
                    <p className='survey-description'>{this.state.surveyDescription}</p>
                </div>
                
                <p className='headings'>Survey Owner</p>
                <p className='admin-name'>{this.state.adminName} {this.state.adminEmail}</p>
                
                <Link to='/Participant_Step2'>
                    <button>Next</button>
                </Link>

            </div>

            {/* <div className='center'>
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
          </div> */}
        </div>
        )
    }
}