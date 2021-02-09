import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
// import { getSurveys } from '../BackendFunctions';
//TODO store admin name and email when creating survey
//TODO add questions before this page 
export default class Participant_Step3 extends React.Component {
    constructor() {
        super();
      this.state = {
          surveyID: '',
          surveyName: '',
          statements: [],
          category1: '',
          category2: '',
          category3: '',
          category1Statements: [],
          category2Statements: [],
          category3Statements: [],

        }
    }

  componentDidMount() {
    this.getStatements();

  };

  getSurveyDetails (){
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
      category1: localStorage.getItem('CATEGORY1'),
      category2: localStorage.getItem('CATEGORY2'),
      category3: localStorage.getItem('CATEGORY3'),
    })
  };

  getStatements = (e) => {

    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
      category1: localStorage.getItem('CATEGORY1'),
      category2: localStorage.getItem('CATEGORY2'),
      category3: localStorage.getItem('CATEGORY3'),
    });

    e.preventDefault()

      fetch("https://auto-q-survey-web.herokuapp.com/api/getStatements", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyID: this.state.surveyID,
        })
      })
        .then(res => {
          return res.json()
        })
        .then((data) => {
          console.log(data)
          // this.setState({ surveyID: data.survey_id });
          // if (this.state.surveyID != null) {
          //   localStorage.setItem('SURVEY_ID', this.state.surveyID);
          //   localStorage.setItem('SURVEY_NAME', data.survey_name);
          //   localStorage.setItem('SURVEY_DESCRIPTION', data.survey_description);
          //   localStorage.setItem('CATEGORY1', data.category1);
          //   localStorage.setItem('CATEGORY2', data.category2);
          //   localStorage.setItem('CATEGORY3', data.category3);
          //   localStorage.setItem('PRIVACY_NOTICE', data.privacy_statement);
          //   this.setState({ Redirect: true });
          // };
        })
        .catch(error => console.log(error));

  };

    render() {
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Q-Sort - Step 1
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

        </div>
        )
    }
}