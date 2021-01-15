import React from 'react';
import { register } from '../BackendFunctions';
import { Link, Redirect } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        fetch("https://auto-q-survey-web.herokuapp.com/register", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                surname: this.state.surname,
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then(response => {
            console.log(response)
            if (response.ok == true) {
                this.setState({ Redirect: true });
            }
        });
        
    // fetch('admins/register', {

    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         first_name: this.state.first_name,
    //         surname: this.state.surname,
    //         email: this.state.email,
    //         password: this.state.password,
    //     })
    //     })
    //     .then(response => {
    //         console.log(response)
    //     })


        // register(newAdmin)
        //     .then(response => {
        //        // this.props.history.push(`/`)
        //         console.log(response)
        //     })
        
    };

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
                <div className='container'>
                    <h1 className='heading-white'>Create account</h1>

                    <form className='center'>
                        <div>
                            <div>
                                <label className='label'>First Name</label>
                                <input
                                    className='center name-input'
                                    type='text'
                                    name='first_name'
                                    value={this.state.first_name}
                                    onChange={this.handleChange}
                                />

                            </div>

                            <div>
                                <label className='label'>Surname</label>
                                <input
                                    className='center name-input'
                                    type='text'
                                    name='surname'
                                    value={this.state.surname}
                                    onChange={this.handleChange}
                                />

                            </div>

                            <div>
                                <label className='label'>Email</label>
                                <input
                                    className='center name-input'
                                    type='email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />

                            </div>

                            <div>
                                <label className='label'>Password</label>
                                <input
                                    className='center name-input'
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />

                            </div>

                            <div>
                                <label className='label'>Confirm Password</label>
                                <input
                                    className='center name-input'
                                />

                            </div>

                            <div>
                                <button className='register-btn'
                                    onClick={this.onSubmit}>
                                REGISTER
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}