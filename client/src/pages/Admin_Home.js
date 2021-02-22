import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/HomeGrid.css';
import { Input } from '@material-ui/core';
import { login } from '../BackendFunctions';
// import Navbar from './Navbar/Navbar';
import Cookies from 'js-cookie';


class Admin_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      adminToken: '',
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
              Build Q-methodology research survey
            </p>
            <p className="sub-heading2">Digital Application</p>
          </div>

          <div className=' item6 navbar-container'>
            {/* <Navbar/> */}
          </div>

        </div>
        
        <div className='center-squares'>
          
          <div className="sub-container-admin">
            <h2 className="heading-two">Create an account</h2>
            <p className="sub-paragraph">
                Register with few clicks and start your Q-methodology survey!
            </p>
              
            <div className="btn-container">
              <div className='btn-center'>
                <Link to={"/register"}>
                <button className="btn">SING UP</button>
                </Link>
              </div>
            </div>
            </div>
          
          <div className="sub-container-admin">
            <h2 className="heading-two">Sign in</h2>

            <div className="center">
              <input
                className="input-box-admin"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              ></input>
            </div>

            <div className="center">
              <input
                className="input-box-admin"
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
          
        </div>

      </div>
    );
  }
}

export default Admin_Home;