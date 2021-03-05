import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import uuid from 'react-uuid';

export default class Participant_Step3_questions extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyID: '',
      surveyName: '',
        
      questions: [],

    };

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
            
            this.setState(prevState => ({
              questions: { ...prevState.questions, ...questionsArr },
            }));

            // var keys = Object.keys(this.state.)
            //   for (var j = 0; j < keys.length; j++){  
            //     if (!(keys[j] in this.state.columns['column-1'].statementIds)) {
            //       this.state.columns['column-1'].statementIds.push(keys[j])
            //     }     
            //   };

          };

          console.log(this.state.questions)
        })
      .catch(error => console.log(error));
  };

  

  next = () => {
    

  };


  render() {
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Participant_Step3',
        }}/>
      )
    };
       
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container-white">
                <h1 className="sub-heading-blue-2">
                  Demographics
                </h1>
                <p className="sub-sub-heading-blue-2">Step 3 of 4</p>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            

            <div className='center-2'>
              <p className='headings'>Survey Name</p>  
              <p className='survey-name'>{this.state.surveyName}</p>

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