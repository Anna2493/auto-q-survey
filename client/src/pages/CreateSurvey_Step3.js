import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createAnchor, getSurveys } from '../BackendFunctions';
import ReactFileReader from 'react-file-reader';
//TODO fix direct mutation of the state
export default class CreateSurvey_Step3 extends React.Component {
    constructor() {
        super();
        this.state = {
            
            surveyID: '',
            statementsFromFile: []
        }

        this.postNewBoard = this.postNewBoard.bind(this);
        
    }

    componentDidMount() {
        this.getSurveyId();
    }

    getSurveyId() {
        this.setState({ surveyID : localStorage.getItem('SURVEY_ID')})
    };

    postNewBoard(e) {
        e.preventDefault();            
    }

    handleFiles = files => {
        var reader = new FileReader();
        var results;
        var resultsSplit;
        var totalCards = localStorage.getItem('TOTAL_CARDS');
        totalCards = parseInt(totalCards);
        var match = false;
        
        reader.onload = () => {
            results = reader.result;
            resultsSplit = results.split('\r\n');
            resultsSplit.pop();

            if(resultsSplit.length != totalCards){
                alert("The number of statements doesn't match with the number of cards");
            }
            else {
                localStorage.setItem('STATEMENTS', resultsSplit.toString());
                this.setState({ Redirect: true });
            }

        };
        reader.readAsText(files[0]);
        
    };



    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                    pathname: '/UploadStatements'
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
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>
                
                <div className='center'>
                    <div className='gap'>
                        <Link to={"/ManuallStatements"}>
                            <button className='big-btn'>
                                    Enter statements manually
                            </button>
                        </Link>
                    </div>
                    <div className='gap'>
                        <ReactFileReader fileTypes={'.csv'} handleFiles={this.handleFiles}>
                        <button className='big-btn'>
                            Upload statements from file     
                        </button>
                        </ReactFileReader>
                    </div>

                    {/* <div>
                        <ReactFileReader fileTypes={'.csv'} handleFiles={this.handleFiles}>
                            <button className='btn'>Upload</button>
                        </ReactFileReader>
                    </div> */}
     
                </div>

                
        
                </div>
            
           
        )
    }
}