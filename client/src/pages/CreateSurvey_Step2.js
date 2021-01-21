import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createSurvey } from '../BackendFunctions';

export default class CreateSurvey_Step2 extends React.Component {
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
            surveyCode: 'ABC123',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                    
                        
                        <div>
                            <button
                                onClick={this.postSurvey}
                                className="register-btn">
                                    Next
                            </button>
                        </div>
        
                </div>
            </div>
           
        )
    }
}