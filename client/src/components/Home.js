import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/HomeGrid.css';
import { Input } from '@material-ui/core';
import { login } from '../BackendFunctions';
import Navbar from './Navbar/Navbar';
import Cookies from 'js-cookie';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      adminToken: '',
      surveyCode: '',
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
          // this.setState({ adminToken: data.token });
          // //console.log(this.state.adminToken);
          // if (this.state.adminToken != null) {
          //   Cookies.set('user', 'true');
          //   localStorage.setItem('ADMIN_TOKEN', this.state.adminToken);
          //   this.setState({ Redirect: true });
          // };
        })
        .catch(error => console.log(error));
    }

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
            <h1 className="heading">
              Build Q-methodology research survey
            </h1>
          </div>

          <div className=' item6 navbar-container'>
            <Navbar/>
          </div>

        </div>
        
        <div className='grid-container2'>
          
          <div className="item2 sub-container">
            <h2 className="heading-two">Create an account</h2>
            <p className="sub-paragraph">
                Register with few clicks and discover full potential of
                autoQsurvey
            </p>
              
            <div className="btn-container">
              <div className='btn-center'>
                <Link to={"/register"}>
                <button className="btn">SING UP</button>
                </Link>
              </div>
            </div>
            </div>
          
          <div className="item3 sub-container">
            <h2 className="heading-two">Sign in</h2>

            <div className="center">
              <input
                className="inputBox"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              ></input>
            </div>

            <div className="center">
              <input
                className="inputBox"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              ></input>
            </div>

            <div className="btn-container">
               <div className='btn-center'>
              <Link to={"/profile"}>
                <button className="btn" onClick={this.signin}>
                  SIGN IN
                </button>
                </Link>
                </div>
            </div>

            <div className="center">
              <button className="pass-reset-btn">Reset password</button>
            </div>
          </div>

          <div className="item4 sub-container">
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

export default Home;