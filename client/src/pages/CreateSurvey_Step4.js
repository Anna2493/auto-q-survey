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
        this.setState({
            questions: this.state.questions,
            question: ''
        });
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
            { this.setState({ Redirect: true }); }; 
            console.log("Questions successfully added to the database");
        }

    };

    deleteQuestion = (index) => {
        var copyQuestionsArr = this.state.questions;
        copyQuestionsArr.splice(index, 1)
        console.log(copyQuestionsArr)
        this.setState({ questions: copyQuestionsArr })
    };

    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/CreateSurvey_Finish',
                }}/>
            )
        };

        const renderQuestion = (question, index) => {
            return (
                <tr key={index}>
                    <td>{question.question}</td>
                    <td className='remove-btn-align'>
                        <button
                            onClick={this.deleteQuestion.bind(this, index)}
                            className = 'delete-question-btn'>
                            X
                        </button>
                    </td>
                </tr>
            )
        }
        
        return (
            <div>
                <div className='grid-container'>
                   <div className="item1 sub-header-container-white">
                         <h1 className="sub-heading-blue-2">
                            Add Questions
                        </h1>
                        <p className="sub-sub-heading-blue-2">Step 3 of 4</p>
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='column-center'>
                    <div className='total-text-container'>
                        <h1 className='total-cards-text'>Ask Participant</h1>
                        <p className="paragraph">
                            By adding questions to your survey you can find out
                             more about the participant, which could assist in 
                            data analysis. This step is optional.
                        </p>

                    </div>

                    <div className='question-cards-container'>
                        <div className='questions-column-center'>
                            <p className="paragraph">
                            Type in your question below
                            </p>
                            <div className='space'>
                                <textarea
                                    className='input-question-field'       
                                    type='text'
                                    name='question'
                                    value={this.state.question}
                                    onChange={this.handleChange}
                                    placeholder='Your question...'
                                />
                            </div>
                            
                            <button
                                className="add-question-btn"
                                onClick={this.addQuestion}
                                >
                                Add +
                            </button>

                            <div className='questions-container'>
                                <table className='table'>
                                     <thead >
                                        <tr>
                                        <th className='question-column'>Question</th>
                                        <th className='delete-column'>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.questions.map(renderQuestion)}
                                    </tbody>
                                </table>
                            </div>
                        
                        </div>     
                        
                    </div>

                     <div className='center-btn-row'>    
                        <button
                            // onClick={this.postSurvey}
                            className="next2-btn">
                            Save and Quit
                        </button> 
                        <button
                            onClick={(e) => this.next(e)}
                            className="next2-btn">
                            Finish
                        </button> 
                    </div>
                </div>
                

            </div>
        )

    }
}