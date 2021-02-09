import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createQuestion } from '../BackendFunctions';

export default class CreateSurvey_Finish extends React.Component {
    constructor() {
        super();
        this.state = {
            
            surveyID: '',
            surveyCode: '',
        }

    }

    componentDidMount() {
        this.setState({
            surveyID: localStorage.getItem('SURVEY_ID'),
            surveyCode: localStorage.getItem('SURVEY_CODE'),
        });
    };

    clearLocalStorage = () => {
        localStorage.removeItem('SURVEY_ID');
        localStorage.removeItem('SURVEY_CODE');
        localStorage.removeItem('STATEMENTS');
        localStorage.removeItem('TOTAL_CARDS');
    }




    render() {
        
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container">
                        <h1 className="sub-heading">
                            Create Survey
                        </h1>
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='column-center'>
                    <div className='total-text-container'>
                        <h1 className='total-cards-text'>Finish Survey</h1>
                    </div>

                    <div>
                        <h2>Survey Code</h2>
                        <p>{this.state.surveyCode}</p>
                    </div>
                
                    <Link to={"/Profile"}>
                        <button
                            className="register-btn"
                            onClick={this.clearLocalStorage}>
                                Finish
                        </button>
                        </Link>
                </div>
                

            </div>
        )

    }
}