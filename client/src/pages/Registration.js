import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { register } from '../BackendFunctions';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.postNewAdmin = this.postNewAdmin.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    validateUser(e) {
        e.preventDefault();
        if (this.state.password != this.state.confirmPassword) {
            alert("Password don't match");
        }
        else if (!this.state.email.includes('@')) {
            alert("Email address must contain @ symbol");
        }
        else if (this.state.first_name === '' ||
            this.state.surname === '' ||
            this.state.email === '' ||
            this.state.password === '') {
            
            alert("Please fill in every field");
        }
        else {
            this.postNewAdmin();
        };
    }

    postNewAdmin() {

       const newAdmin = {
            first_name: this.state.first_name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password
            };

            register(newAdmin)
                .then(response => {
                    console.log(response);
                    if (response.ok == true) {
                        this.setState({ Redirect: true });
                    };
            });
    }


    // onSubmit(e) {
    //     e.preventDefault();

    //     if (this.state.password != this.state.confirmPassword) {
    //         alert("Password don't match");
    //     }
    //     else if (!this.state.email.includes('@')) {
    //         alert("Email address must contain @ symbol");
    //     }
    //     else if (this.state.first_name == '' ||
    //         this.state.surname == '' ||
    //         this.state.email == '' ||
    //         this.state.password == '') {
            
    //         alert("Please fill in every field");
    //     }
    //     else {
    //         fetch("https://auto-q-survey-web.herokuapp.com/api/register", {

    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 first_name: this.state.first_name,
    //                 surname: this.state.surname,
    //                 email: this.state.email,
    //                 password: this.state.password,
    //             })
    //         })
    //             .then(response => {
    //                 console.log(response)
    //                 if (response.ok == true) {
    //                     this.setState({ Redirect: true });
    //                 }
    //             });
    //     }
    // };

    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/',
                }}/>
            )
        };
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container">
                        <h1 className="sub-heading">
                            Create an Account
                        </h1>
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>
                
           
                <div className='content-container'>
                    <div className='form-container'>
                        <form> 
                            
                        <div className='label-container'>
                            <label className='label'>Name</label>
                        </div>
                        <input
                            className='form-input'
                            type='text'
                            name='first_name'
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            />

                        <div className='label-container'>
                            <label className='label'>Surname</label>
                        </div>
                        <input
                            className='form-input'
                            type='text'
                            name='surname'
                            value={this.state.surname}
                            onChange={this.handleChange}
                            />
                            
                        <div className='label-container'>
                            <label className='label'>Email</label>
                        </div>
                            <input
                                className='form-input'
                                type='email'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                            />

                        <div className='label-container'>
                            <label className='label'>Password</label>
                        </div>
                            <input
                                className='form-input'
                                type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            
                        <div className='label-container'>
                            <label className='label'>Confirm Password</label>
                        </div>
                            <input
                                className='form-input'
                                type='password'
                                name='confirmPassword'
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />

                        <button className='register-btn'
                            onClick={this.validateUser}>
                            REGISTER
                        </button>
                                

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}