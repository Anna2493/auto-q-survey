import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// import { getSurveys } from '../BackendFunctions';

export default class Participant_Step2 extends React.Component {
    constructor() {
        super();
        this.state = {
          surveyName: '',
          privacyNotice: '',
          adminName: 'Admin Name',
          adminEmail: 'admin@gmail.com',
          agreed: false,

        }
  };

  componentDidMount() {
    this.getSurveyDetails();

  };

  getSurveyDetails() {
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      privacyNotice: localStorage.getItem('PRIVACY_NOTICE'),
    })
  };

  handleCheckboxChange = () => {
    this.setState(previousState => {
      return { agreed: !previousState.agreed }
    })
    
  };

  clearLocalStorage = () => {
    localStorage.clear();
  }

  render() {
      
        let agreeBtnStyle = this.state.agreed ? 'enabled' : 'disabled';
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container-white">
                        <h1 className="sub-heading-blue-2">
                            Privacy Notice
                        </h1>
                        <p className="sub-sub-heading-blue-2">Step 2 of 4</p>
                    </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            <div className='center-2'>
                <p className='headings'>Survey Title</p>
                
                <p className='survey-name'>{this.state.surveyName}</p>
                
                <p className='headings'>Survey Owner</p>
                <p className='admin-name'>{this.state.adminName} {this.state.adminEmail}</p>

                <p className='headings'>Privacy Notice</p>
                    <div className='description-container'>
                        <p className='survey-description'>{this.state.privacyNotice}</p>
                    </div>

                <p>I Agree 
                    <input 
                    name ="agree"
                    type="Checkbox"
                    value={this.state.agreed}
                    onChange={this.handleCheckboxChange}
                    />
              </p>
              
              <div className='center-btn-row'> 
                <Link to={'/Participant_Home'}>
                  <button
                  className='next2-btn'
                  onClick={this.clearLocalStorage}>
                      Disagree
                  </button>
                  </Link>
                
                <Link to={'/Participant_Step3'}>
                  <button
                    type="submit" 
                    className = {agreeBtnStyle}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                </Link>
              </div>
            </div>

        </div>
        )
    }
}