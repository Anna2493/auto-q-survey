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

      category1List: [],
      category2List: [],
      category3List: [],
    }
  };

  componentDidMount() {

    
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
      category1: localStorage.getItem('CATEGORY1'),
      category2: localStorage.getItem('CATEGORY2'),
      category3: localStorage.getItem('CATEGORY3')
    });

    this.getAnchors();  

  };

  getAnchors(e){
    //e.preventDefault()

    var surveyID = localStorage.getItem('SURVEY_ID');
    var anchorsArr = [];
    var statementId = '';
    var anchorsArr3 = [];
    var slot= '';
    var slots = [];
    var numberOfSlots = [];
    var arr = [];

    var statementsCat1 = []

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
          //Sort the data first
          
          for (var i = 0; i < data.length; i++) {
            arr.push(data[i].anchor)
            numberOfSlots = data[i].slots
            //Create and array of objects for each anchor
            //the number of objects is specified in the data[i].slots 
            //push it to
            for (var array = [], j = 0; j < numberOfSlots; j++) {
              array.push({ id: j.toString() });
            }
            anchorsArr3.push({ id: i.toString(), anchorNumber: data[i].anchor, slots: array });
            
          };

          this.sort('anchorNumber', anchorsArr3)
          this.setState({ anchors: anchorsArr3 });
          
        })
      .catch(error => console.log(error));
    
    //Get statements for category 1
      var statements = localStorage.getItem('CATEGORY1_STATEMENTS')
      var statementsCat1 = JSON.parse(statements)
      console.log(statementsCat1)
      this.setState({ category1List : statementsCat1 })
    
    var categories = [];
    for (var i = 0; i < statementsCat1.length; i++){
      categories.push(statementsCat1[i])
      //this.state.anchors.push({category1: statementsCat1[i]})
    }
    
    
    //this.setState(prevState => ({ anchors: [...prevState.anchors, categories]}))
    console.log(categories)
  };

  sort = function (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;
              
    arr.sort(function (a, b) {
      var i = 0;
        while( i < len ) {
          a = a[prop[i]];
          b = b[prop[i]];
          i++;
        }
      if (a < b) {
        return -1;
      }
      else if (a > b) {
        return 1;
      }
      else {
        return 0;
      }
    });
    return arr;
  };

  render() {
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
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}> 
                <div>                    
                  <div                       
                    style={{
                      margin: 8,
                      border: '1px solid black',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 10,
                      textAlign: 'center'
                    }}
                  >
                    {this.state.anchors.map((item, index) => (
                      <div key={item.id} index={index}>                            
                        <div>
                          <div
                            style={{
                              userSelect: "none",
                              padding: 10,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              backgroundColor: 'grey',
                            }}
                          >
                            {item.anchorNumber}
                              <div>                                    
                                <div                                        
                                  style={{
                                    userSelect: "none",
                                    padding: 10,
                                    margin: "0 0 8px 0",
                                    minHeight: 50,
                                    width: 110,
                                    backgroundColor: 'lightGrey',
                                    color: "white",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: "center",
                                  }}
                                >
                                  <DragDropContext onDragEnd={this.onDragEnd}>
                                    {item.slots.map((item, index) => (
                                      <Droppable
                                        key={item.id}
                                        droppableId={item.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <div style={{ display: "flex", justifyContent: "center" }}>
                                            <div
                                              ref={provided.innerRef}
                                              style={{
                                                userSelect: "none",
                                                padding: 10,
                                                margin: "0 0 8px 0",
                                                height: 50,
                                                width: 100,
                                                backgroundColor: "#456C86",
                                                color: "white",
                                              }}
                                            >
                                            </div>

                                            {/* {this.state.category1List.map((item, index) => (
                                                  <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                  >
                                                    {(provided, snapshot) => (
                                                      <div style={{ display: "flex" }}>
                                                        <div
                                                          ref={provided.innerRef}
                                                          // {...provided.draggableProps}
                                                          // style={getItemStyle(
                                                          //   snapshot.isDragging,
                                                          //   provided.draggableProps.style
                                                          // )}
                                                        >
                                                          {item.content}
                                                        </div>
                                                        {provided.placeholder}
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                ))} */}
                                              {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    ))}
                                  
                                    
                                      
                                  </DragDropContext>
                                </div>                                  
                              </div>
                            </div>                                
                          </div>                           
                      </div>
                    ))}                        
                  </div>                   
                </div>
              
              </div>
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