import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createQuestion } from '../BackendFunctions';

export default class CreateSurvey_Step4 extends React.Component {
    constructor() {
        super();
        this.state = {
            totalCards: '',
            surveyID: '',
            questionCards: [],
            question: '',
            questions: []
        }

    }

    componentDidMount() {
        this.setState({ surveyID: localStorage.getItem('SURVEY_ID') });
    };


    handleChange = (event) => {
       this.setState({
            [event.target.name]: event.target.value
        });
    };

    addQuestion = () => {
        this.state.questions.push({ question: this.state.question, surveyID: localStorage.getItem('SURVEY_ID') });
        this.setState({ questions : this.state.questions})
        console.log(this.state.questions)
    }


    next = (e) => {
        e.preventDefault();

        const question = this.state.questions;
        //console.log(statement)
        var newQuestion = {};
        var success = [];
        for (var i = 0; i < question.length; i++){
            newQuestion = question[i];
            createQuestion(newQuestion)
                .then(response => {
                    success.push(response.ok)
                })
                .catch(err => { console.log(err) })
        }
        var check = success.every( function (value, _, array) { return array[0] === value; });
        if (check === true) {
            //this.getTotal();
            //{ this.setState({ Redirect: true }); }; 
            console.log("Questions successfully added to the database");
        }

    };




    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/',
                }}/>
            )
        };

        const renderQuestion = (question, index) => {
            return (
                <tr key={index}>
                    <td>{question.question}</td>
                </tr>
            )
        }
        
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
                        <h1 className='total-cards-text'>Ask Questions</h1>
                    </div>

                    <div className='question-cards-container'>
                        <div className='questions-column-center'> 
                            <div className='space'>
                                <textarea
                                    className='input-question-field'       
                                    type='text'
                                    name='question'
                                    // value={this.state.question}
                                    onChange={this.handleChange}
                                />
                            </div>
                            
                            <button
                                className="add-question-btn"
                                onClick={this.addQuestion}
                                >
                                Add
                            </button>

                            <div>
                                <table>
                                    <tbody>
                                        {this.state.questions.map(renderQuestion)}
                                    </tbody>
                                    </table>
                            </div>
                        
                        </div>     
                        
                    </div>

                    <button
                        className="register-btn"
                        onClick={(e) => this.next(e)}>
                        Next
                    </button>
                </div>
                

            </div>
        )

    }
}