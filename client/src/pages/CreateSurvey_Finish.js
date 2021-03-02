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
            surveyID: localStorage.getItem('CURRENT_ID'),
            surveyCode: localStorage.getItem('CURRENT_CODE'),
        });
    };

    clearLocalStorage = () => {
        localStorage.removeItem('SURVEY_ID');
        localStorage.removeItem('CURRENT_SURVEY_CODEE');
        localStorage.removeItem('STATEMENTS');
        localStorage.removeItem('TOTAL_CARDS');
    }




    render() {
        
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container-white">
                         <h1 className="sub-heading-blue-2">
                            Survey Completed!
                        </h1>
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='column-center'>
                    <div className='total-text-container'>
                        <h1 className='total-cards-text'>Your survey is ready</h1>
                    </div>

                    
                        <h2 className='total-cards-text'>Survey Code</h2>
                        <p className="paragraph">
                        Distribute this code among your participants
                        to allow them access your survey.
                        </p>
                        
                        <div className='code-container'>
                            <p className='code'>{this.state.surveyCode}</p>
                        </div>
                        <p className="paragraph">
                            You can also find this code on your profile.
                        </p>
                       
                    
                
                    <Link to={"/Profile"}>
                        <button
                            className="next-btn"
                            onClick={this.clearLocalStorage}>
                                Finish
                        </button>
                        </Link>
                </div>
                

            </div>
        )

    }
}