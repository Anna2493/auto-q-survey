import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import uuid from 'react-uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//TODO store admin name and email when creating survey
//TODO add questions before this page 

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //console.log(result);
  const [removed] = result.splice(startIndex, 1);
  //console.log(removed);
  result.splice(endIndex, 0, removed);
  //console.log(result);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {

  //console.log(source)
  //console.log(destination)
    const sourceClone = Array.from(source);
    console.log(sourceClone)
    const destClone = Array.from(destination);
    console.log(destClone)
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log(removed)
    destClone.splice(droppableDestination.index, 0, removed);
    console.log(destClone)
    
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    console.log(result)
    return result;
};


export default class Participant_Step4 extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyID: '',
      surveyName: '',
        
      category1: '',
      category2: '',
      category3: '',

      anchors: [],
     
    };

  };

  componentDidMount() {
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
      category1: localStorage.getItem('CATEGORY1'),
      category2: localStorage.getItem('CATEGORY2'),
      category3: localStorage.getItem('CATEGORY3'),
    });

    this.getAnchors();
  };

  getAnchors(e){
    //e.preventDefault()

    var surveyID = localStorage.getItem('SURVEY_ID');
    var anchorsArr = [];
    var statementId = '';

      fetch("https://auto-q-survey-web.herokuapp.com/api/getAnchors", {

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
            
            anchorsArr.push({ id: i.toString(), anchor: data[i].anchor, slots: data[i].slots })
            
            this.setState(prevState => ({
              anchors: { ...prevState.anchors, ...anchorsArr },
            }));

            // var keys = Object.keys(this.state.statements)
            //   for (var j = 0; j < keys.length; j++){  
            //     if (!(keys[j] in this.state.columns['column-1'].statementIds)) {
            //       this.state.columns['column-1'].statementIds.push(keys[j])
            //     }     
            //   };

          }
        })
      .catch(error => console.log(error));
  };

 

  render() {
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Participant_Step1',
        }}/>
      )
    };
       
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container">
                <h1 className="sub-heading">
                  Q-Sort - Step 2
                </h1>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            

            <div className='center-2'>
              <p className='headings'>Survey Name</p>  
              <p className='survey-name'>{this.state.surveyName}</p>

              

              <div>
                <button onClick={this.next}>
                  Next
                </button>
              </div>
            </div>

        </div>
        )
    }
}