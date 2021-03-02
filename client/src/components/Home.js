import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/HomeGrid.css';
import { Input } from '@material-ui/core';
import { login } from '../BackendFunctions';
import Navbar from './Navbar/Navbar';
import Cookies from 'js-cookie';
import { getSurveys } from '../BackendFunctions';
import jwt_decode from "jwt-decode";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      adminToken: '',
      surveyCode: '',
      surveyID: '',
    };

      this.onChange = this.onChange.bind(this);
      this.signin = this.signin.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    }
    
    signin(e) {
      e.preventDefault()

      fetch("https://auto-q-survey-web.herokuapp.com/api/login", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
        .then(res => {
          return res.json()
        })
        .then((data) => {
          this.setState({ adminToken: data.token });
          //console.log(this.state.adminToken);
          if (this.state.adminToken != null) {
            Cookies.set('user', 'true');
            localStorage.setItem('ADMIN_TOKEN', this.state.adminToken);
            this.setState({ Redirect: true });
          };
        })
        .catch(error => console.log(error));
  };

  render() {

    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/profile',
        }}/>
      )
    }
    return (
      <div>
        <div className='grid-container'>

          <div className="item1 header-container">
            <p className="heading">
              Q-methodology research survey
            </p>
            <p className="sub-heading2">Digital Application</p>
          </div>

          <div className=' item6 navbar-container'>
            <Navbar/>
          </div>

        </div>
        
        <div className='center-squares'>

          <div className="sub-container">
    
            <h2 className="heading-two">Admin</h2>
            <div className="btn-container">
              <div className="center">
                <Link to={'/Admin_Home'}>
                  <button className="btn">I am a researcher</button>
                </Link>
                </div>
            </div>
          </div>

          <div className="sub-container">
            <h2 className="heading-two">Participant</h2>
            <div className="btn-container">
              <div className="center">
                <Link to={'/Participant_Home'}>
                  <button className="btn">I am a participant</button>
                </Link>
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

export default Home;