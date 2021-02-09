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
            adminID: '',
            surveyCode: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.postSurvey = this.postSurvey.bind(this);
    }

    componentDidMount() {
        const id = localStorage.getItem('ADMIN_ID');
        this.setState({ adminID: id });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    generateSurveyCode() {
        var randomString = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        for (var i = 0; i < 6; i++){
            randomString += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        this.setState({ surveyCode: randomString });
    }

    postSurvey(e) {
        
        var randomString = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        for (var i = 0; i < 6; i++){
            randomString += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        e.preventDefault();

        const newSurvey = {
            adminID: this.state.adminID,
            surveyName: this.state.surveyName,
            surveyDescription: this.state.surveyDescription,
            category1: this.state.category1,
            category2: this.state.category2,
            category3: this.state.category3,
            privacyStatement: this.state.privacyStatement,
            surveyCode: randomString
        };
        
            createSurvey(newSurvey)
                .then(res => {
                    console.log(res);
                    if (res.ok == true) {
                        this.setState({ Redirect: true });
                        console.log('survey added')
                    };
            });
    }


    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/CreateSurvey_Step2',
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
                        <textarea
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
                            <textarea
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