import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// import { getSurveys } from '../BackendFunctions';
//TODO store admin name and email when creating survey
export default class Participant_Finish extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyName: '',
            surveyDescription: '',
            adminName: 'Admin Name',
            adminEmail: 'admin@gmail.com',

        }
    }

  componentDidMount() {
    this.getSurveyDetails();

  };

  getSurveyDetails() {
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyDescription: localStorage.getItem('SURVEY_DESCRIPTION'),
    })
  };

    render() {
        return (

            <div>
            <div className='grid-container'>
               <div className="item1 sub-header-container-white">
                        <h1 className="sub-heading-blue-2">
                            Q-Sort Complete
                        </h1>
                        <p className="sub-sub-heading-blue-2">Thank you</p>
                    </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            

            <div className='center-2'>
                 <p className='headings'>Survey Title</p>
                
                <p className='survey-name'>{this.state.surveyName}</p>
                
                <p className='headings'>Thank you!</p>
                
                <Link to='/Participant_Home'>
                    <button className='next-btn'>Finish</button>
                </Link>

            </div>

           
        </div>
        )
    }
}