import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Input } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';


export default class Participant_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyCode: '',
      surveyID: '',
    };
  }

  onChange = (e) =>  {
    this.setState({
      [e.target.name]: e.target.value,
    });
    }

  getSurvey = (e) => {
    e.preventDefault()

    fetch("https://auto-q-survey-web.herokuapp.com/api/getSurveyDetails", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        surveyCode: this.state.surveyCode,
      })
    })
      .then(res => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({ surveyID: data.survey_id });
        // //console.log(this.state.adminToken);
        if (this.state.surveyID != null) {
          localStorage.setItem('SURVEY_ID', this.state.surveyID);
          localStorage.setItem('SURVEY_NAME', data.survey_name);
          localStorage.setItem('SURVEY_DESCRIPTION', data.survey_description);
          localStorage.setItem('CATEGORY1', data.category1);
          localStorage.setItem('CATEGORY2', data.category2);
          localStorage.setItem('CATEGORY3', data.category3);
          localStorage.setItem('PRIVACY_NOTICE', data.privacy_statement);
          this.setState({ Redirect: true });
        };
      })
      .catch(error => console.log(error));
  };

  render() {

    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Participant_Step1',
        }}/>
      )
    }
    return (
      <div>
        <div className='grid-container'>

          <div className="item1 header-container">
            <h1 className="heading">
              Take Part in Q-Methodology Survey
            </h1>
          </div>

          <div className=' item6 navbar-container'>
            <Navbar/>
          </div>

        </div>
        
        <div className='center-3'>

          <div className="sub-container">
            <h2 className="heading-two">Participant</h2>

            <div className="center">
              <input
                className="inputBox"
                placeholder="Code"
                type="text"
                name="surveyCode"
                value={this.state.surveyCode}
                onChange={this.onChange}
              >
                
              </input>
            </div>

            <div className="btn-container">
              <div className="center">
                {/* <Link to={'/Participant_Step1'}> */}
                  <button className="btn" onClick={this.getSurvey}>START SURVEY</button>
                {/* </Link> */}
                </div>
            </div>
 
            <div className="center">
              <button className="pass-reset-btn">Manage my data</button>
            </div>
          </div>
          
        </div>

      </div>
    );
  }
}
