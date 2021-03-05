import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { getSurveys } from '../BackendFunctions';
import { withConverter } from "js-cookie";
import Icon from '../icons/logout.png';
import Cookies from 'js-cookie';

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
      
      //this.getSurveys = this.getSurveys.bind(this);
    }

  componentDidMount() {
    const token = localStorage.getItem('ADMIN_TOKEN');
    const decoded = jwt_decode(token);
    this.setState({
      firstName: decoded.first_name,
      email: decoded.email,
      adminID: decoded.id,
      
    });

    //console.log(this.state.adminID)

    // const requestSurveys = {
    //   adminID: decoded.id
    // };
    
    // getSurveys(requestSurveys);
    //var surveyNames = localStorage.getItem('SURVEY_NAMES');
    // console.log(surveyNames)

    localStorage.setItem('ADMIN_ID', decoded.id)
    this.getSurveys();

  };

  getSurveys = () => {

    const token = localStorage.getItem('ADMIN_TOKEN');
    const decoded = jwt_decode(token);

    fetch("https://auto-q-survey-web.herokuapp.com/api/getSurveys", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adminID: decoded.id,
        })
    })
        .then(res => {
            return res.json()
        })
        .then((data) => {
          //console.log(data);
          var surveyNames = data.map(({ survey_name }) => survey_name);
          var surveyCodes = data.map(({ survey_code }) => survey_code);
          var surveyDates = data.map(({ date }) => date);
                  
          for (var i = 0; i < surveyNames.length; i++) {
            this.state.surveysData.push({
              surveyName: surveyNames[i],
              surveyCode: surveyCodes[i],
              date: surveyDates[i]
            });
          };

          console.log(this.state.surveysData)
          this.setState({})  

        })
        .catch(error => console.log(error));
    
  };

  logout = () => {
    // Cookies.set('user', 'true');
    Cookies.remove('user', 'true');
    this.setState({ Redirect: true });
    
  }


  render() {
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/',
        }}/>
      )
    }
      
        return (
          <div>
            <div className='profile-bg'>
              <Navbar/>
            <div className='content-container-center'> 
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
                <div><button className='profile-btn' onClick={this.logout}>Logout</button></div>       
                {/* <div className='button-with-img'><button className='logout-btn'> <img className='logout-icon' src={Icon} /> Logout</button></div>  */}
                </div>
              </div>

              <div><h1 className='item7 container-heading'>Surveys</h1></div>
                <div className='item10 profile-content-container'>
                  <div className='all-surveys-container'>
                    {this.state.surveysData.length
                      ? this.state.surveysData.map((survey, index) => (
                      <div
                        key={index}
                        className='survey-container'
                      >
                        <div className='survey-details'>
                          <p className='survey-title'>
                            {survey.surveyName}
                          </p>
                          <p className='survey-code'>
                            {survey.surveyCode} 
                          </p>
                          <p className='survey-date'>
                            {survey.date} 
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
                      ))
                      :
                      <div className='survey-container'>

                      </div>
                    }
                    {/* {this.state.surveysData.map((survey, index) => (
                      <div
                        key={index}
                        className='survey-container'>

                      <div className='survey-details'>
                        <p className='survey-title'>
                          {survey.surveyName}
                        </p>
                        <p className='survey-code'>
                          {survey.surveyCode} 
                        </p>
                        <p className='survey-date'>
                          {survey.date} 
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
                    ))}   */}

                  </div>
              </div>
              </div>
              
              </div>
              </div>
        </div>
        )
    }
}