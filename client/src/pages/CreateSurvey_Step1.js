import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createSurvey } from '../BackendFunctions';

export default class CreateSurvey_Step1 extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyName: '',
            description: '',
            category1: '',
            category2: '',
            category3: '',
            privacyStatement: '',
            adminID: 1,
            surveyCode: 'ABC123',
        }
        this.handleChange = this.handleChange.bind(this);
        this.postSurvey = this.postSurvey.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    postSurvey(e) {
        e.preventDefault();
       const newSurvey = {
            adminID: this.state.adminID,
            surveyName: this.state.surveyName,
            surveyDescription: this.state.surveyDescription,
            category1: this.state.category1,
            category2: this.state.category2,
            category3: this.state.category3,
            privacyStatement: this.state.privacyStatement,
            surveyCode: this.state.surveyCode
        };
        
        //console.log(newSurvey)

            createSurvey(newSurvey)
                .then(response => {
                    console.log(response);
                    // if (response.ok == true) {
                    //     this.setState({ Redirect: true });
                    // };
            });
    }


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
                            Create Survey
                        </h1>
                        {/* <h2 className="sub-heading">
                            Step One
                        </h2> */}
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>
                
           
                <div className='survey-content-container'>
                    <div className='survey-form-container'>
                        <form> 
                            
                        <div className='label-container'>
                            <label className='label'>Survey Name</label>
                        </div>
                        <input
                            className='form-input'
                            type='text'
                            name='surveyName'
                            value={this.state.surveyName}
                            onChange={this.handleChange}
                            />

                        <div className='label-container'>
                            <label className='label'>Description</label>
                        </div>
                        <input
                            className='form-input'
                            type='text'
                            name='surveyDescription'
                            value={this.state.surveyDescription}
                            onChange={this.handleChange}
                            />
                            
                        <div className='label-container'>
                            <label className='label'>Category 1</label>
                        </div>
                            <input
                                className='form-input'
                                type='text'
                                name='category1'
                                value={this.state.category1}
                                onChange={this.handleChange}
                            />

                        <div className='label-container'>
                            <label className='label'>Category 2</label>
                        </div>
                            <input
                                className='form-input'
                                type='text'
                                name='category2'
                                value={this.state.category2}
                                onChange={this.handleChange}
                            />
                            <div className='label-container'>
                            <label className='label'>Category 3</label>
                        </div>
                            <input
                                className='form-input'
                                type='text'
                                name='category3'
                                value={this.state.category3}
                                onChange={this.handleChange}
                            />

                        <div className='label-container'>
                            <label className='label'>Privacy and Consent</label>
                        </div>
                            <input
                                className='form-input'
                                type='text'
                                name='privacyStatement'
                                value={this.state.privacyStatement}
                                onChange={this.handleChange}
                            />
                        
                        <div>
                            <button
                                onClick={this.postSurvey}
                                className="register-btn">
                                    Next
                                    </button>
                            
                        </div>
                                
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}