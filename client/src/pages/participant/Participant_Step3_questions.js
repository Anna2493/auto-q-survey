import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import uuid from 'react-uuid';
import { createAnswer } from '../../BackendFunctions';
import { requirePropFactory } from "@material-ui/core";

export default class Participant_Step3_questions extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyID: '',
      surveyName: '',
        
      questions: [],
      answer: [],

      qa: [],

    };

  };

  // handleChange = event => {
  //       this.setState({
  //           [event.target.name]: event.target.value
  //       });
  // };

  handleChange = (e, index) => {
    this.state.answer[index] = e.target.value;

    this.setState({ answer: this.state.answer})
        
  };

  componentDidMount() {
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
    });

    this.getQuestions();
  };

  getQuestions(e){
    //e.preventDefault()

    var surveyID = localStorage.getItem('SURVEY_ID');
    var questionsArr = [];
    var statementId = '';

      fetch("https://auto-q-survey-web.herokuapp.com/api/getQuestions", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyID: surveyID,
        })
      })
        .then(res => {
          return res.json()
        })
        .then((data) => {
          for (var i = 0; i < data.length; i++) {   
            
            questionsArr.push({ id: i.toString(), content: data[i].question })
            
            // this.setState(prevState => ({
            //   questions: { ...prevState.questions, ...questionsArr },
            // }));
            this.setState({ questions: questionsArr})

            // var keys = Object.keys(this.state.)
            //   for (var j = 0; j < keys.length; j++){  
            //     if (!(keys[j] in this.state.columns['column-1'].statementIds)) {
            //       this.state.columns['column-1'].statementIds.push(keys[j])
            //     }     
            //   };

          };

          //console.log(this.state.questions)
        })
      .catch(error => console.log(error));
  };

  next = (e) => {
    e.preventDefault();

    console.log(this.state.answer);
    var questions = this.state.questions;
    var answers = this.state.answer;
    var questionAndAnswer = [];
    for (var i = 0; i < questions.length; i++){
      questionAndAnswer.push({
        questionNumber: i + 1,
        question: questions[i].content,
        answer: answers[i],
        surveyID: this.state.surveyID
      })
    };
    console.log(questionAndAnswer);

    const qa = questionAndAnswer;
    var newAnswer = {};
    var success = [];
    for (var i = 0; i < qa.length; i++){
      newAnswer = qa[i];
      createAnswer(newAnswer)
        .then(response => {
          success.push(response.ok)
        })
      .catch(err => { console.log(err) })
    }
    var check = success.every( function (value, _, array) { return array[0] === value; });
        if (check === true) {
            //this.getTotal();
            { this.setState({ Redirect: true }); }; 
            console.log("Answers successfully added to the database");
        }
  };


  render() {
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Participant_Step3',
        }}/>
      )
    };
      //console.log(this.state.questions) 
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container-white">
                <h1 className="sub-heading-blue-2">
                  Demographics
                </h1>
                <p className="sub-sub-heading-blue-2">Step 3 of 5</p>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            <div className='center-2'>
              <p className='headings'>Survey Name</p>  
              <p className='survey-name'>{this.state.surveyName}</p>
              <p className="paragraph">
                By answering questions provided below the researcher will be able to
                  classify all Q-Sort results. 
                If you do not wish to provide and answer to any or all of the questions
                you may skip this step.
              </p>
              <div className='question-cards-container2'>
                <div className='questions-column-center'>
                  <p className="paragraph">
                    Question
                  </p>
                  {this.state.questions.map((question, index) => {
                    return (
                      <div key={index}>
                        <div className='question-container'>
                          <p className='question'>{question.content}</p>
                        </div>
                        <input
                          className='answer-input'
                          type='text'
                          name='answer'
                          answer={this.state.answer}
                          onChange={(e) => this.handleChange(e, index)}
                          // onChange={this.handleChange.bind(this, index)}
                          // value={this.state.answer}
                          // value={this.state.answer}
                          // onChange={this.handleChange}
                        />
                      </div>
                    )
                  })}
                  
                  </div>     
                        
              </div>

              <div>
                <button className='next-btn' onClick={this.next}>
                  Next
                </button>
              </div>
            </div>

        </div>
        )
    }
}