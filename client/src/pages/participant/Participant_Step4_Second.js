import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import uuid from 'react-uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createResult } from '../../BackendFunctions';

//TODO store admin name and email when creating survey
//TODO add questions before this page 

const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
  //console.log(destClone)
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    //console.log(result)
    return result;
};


export default class Participant_Step4_Second extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyID: '',
      surveyName: '',
        
      category1: '',
      category2: '',
      category3: '',

      anchors: [],
      cat1Statements: [],
      cat2Statements: [],
      cat3Statements: [],

      sortResults : [],
      
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
    var anchorsArr3 = [];
    var numberOfSlots = [];
    var arr = [];
    var cat1Items = [];
    var cat2Items = [];
    var cat3Items = [];


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
              array.push({ id: uuid().toString(), statement: [] });
            }
            anchorsArr3.push({ id: i.toString(), anchorNumber: data[i].anchor, slots: array });
            
          };
          //GET STATEMENTS CATEGORY 1
          var statements1 = localStorage.getItem('CATEGORY1_STATEMENTS')
          var statementsCat1 = JSON.parse(statements1)
          var number = 0;
          for (var i = 0; i < statementsCat1.length; i++){
            number++;
            this.state.cat1Statements.push({ id: uuid().toString(), content: statementsCat1[i].content, category: 1, statementNumber: number })
          };
          //GET STATEMENTS CATEGORY 2
          var statements2 = localStorage.getItem('CATEGORY2_STATEMENTS')
          var statementsCat2 = JSON.parse(statements2) 
          for (var i = 0; i < statementsCat2.length; i++){
            number++;
            this.state.cat2Statements.push({ id: uuid().toString(), content: statementsCat2[i].content, category: 2, statementNumber: number })
          };
          //GET STATEMENTS CATEGORY 3
          var statements3 = localStorage.getItem('CATEGORY3_STATEMENTS')
          var statementsCat3 = JSON.parse(statements3)
          for (var i = 0; i < statementsCat3.length; i++){
            number++;
            this.state.cat3Statements.push({ id: uuid().toString(), content: statementsCat3[i].content, category: 3, statementNumber: number })
          };
          this.sort('anchorNumber', anchorsArr3)
          this.setState({ anchors: anchorsArr3});
          console.log(this.state.anchors);
          console.log(this.state.cat1Statements)
          console.log(this.state.cat2Statements)
          console.log(this.state.cat3Statements)
          
        })
      .catch(error => console.log(error));
    
   
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

  onDragEnd = (result) => {
    const { source, destination } = result;
    //console.log(source, destination)
    // dropped outside the list
    if (!destination) {
      return;
    };

     if ( destination.droppableId === source.droppableId &&
          destination.index === source.index) {
      return
    }

    //Find the index of anchors object and slots given the destinarion only
    var slotPosition;
    var destinationSlot;
    this.state.anchors.map((anchor, index) => {
      anchor.slots.map((slot, i) => {
        if (slot.id == destination.droppableId) {
          slotPosition = i;
          destinationSlot = slot
        };
      });
    });

    var sourceSlotPostion;
    var sourceSlot;
    this.state.anchors.map((anchor, index) => {
      anchor.slots.map((slot, i) => {
        if (slot.id == source.droppableId) {
          sourceSlotPostion = i;
          sourceSlot = slot.statement
        };
      });
    });
    
    switch (source.droppableId) {
      
      case 'ITEMS1':
          const copied = copy(
            this.state.cat1Statements,
            destinationSlot.statement,
            source,
            destination
          );
          //console.log(copied)
          //Remove selected statement from the array
          var copyCat1 = this.state.cat1Statements;
          copyCat1.splice(source.index, 1);
          this.setState({ cat1Statements: copyCat1 });
          //push selected statement onto the selected slot
          destinationSlot.statement.push({ id:copied[0].id, content: copied[0].content, category: 1, statementNumber: copied[0].statementNumber });
        //remove already existing statement within the array
        if (destinationSlot.statement.length == 2) {
          var removed = destinationSlot.statement.splice(0, 1)
          //push removed back to cat1Statements
          //console.log(removed[0].category)
          if (removed[0].category == 1) {
            var copyCat1 = this.state.cat1Statements;
            copyCat1.push(removed[0])
            this.setState({ cat1Statements: copyCat1 });
            console.log('category is 1')
          };
          if (removed[0].category == 2) {
            var copyCat2 = this.state.cat2Statements;
            copyCat2.push(removed[0])
            this.setState({ cat2Statements: copyCat2 });
            console.log('category is 2')
          };
          if (removed[0].category == 3) {
            var copyCat3 = this.state.cat3Statements;
            copyCat3.push(removed[0])
            this.setState({ cat3Statements: copyCat3 });
           };
        };
          
        break;
      case 'ITEMS2':
          const copied2 = copy(
            this.state.cat2Statements,
            destinationSlot.statement,
            source,
            destination
          );
          //console.log(copied)
          //Remove selected statement from the array
          var copyCat2 = this.state.cat2Statements;
          copyCat2.splice(source.index, 1);
          this.setState({ cat2Statements: copyCat2 });
          //push selected statement onto the selected slot
          destinationSlot.statement.push({ id:copied2[0].id, content: copied2[0].content, category: 2, statementNumber: copied2[0].statementNumber });
        
          //remove already existing statement within the array
         if (destinationSlot.statement.length == 2) {
         var removed = destinationSlot.statement.splice(0, 1)
          //push removed back to cat1Statements
           console.log(removed)
            if (removed[0].category == 1) {
            var copyCat1 = this.state.cat1Statements;
            copyCat1.push(removed[0])
            this.setState({ cat1Statements: copyCat1 });
           };
            if (removed[0].category == 2) {
              var copyCat2 = this.state.cat2Statements;
              copyCat2.push(removed[0])
              this.setState({ cat2Statements: copyCat2 });
           };
           if (removed[0].category == 3) {
            var copyCat3 = this.state.cat3Statements;
            copyCat3.push(removed[0])
            this.setState({ cat3Statements: copyCat3 });
           };
       }
          
        break;
      case 'ITEMS3':
          const copied3 = copy(
            this.state.cat3Statements,
            destinationSlot.statement,
            source,
            destination
          );
          //console.log(copied)
          //Remove selected statement from the array
          var copyCat3 = this.state.cat3Statements;
          copyCat3.splice(source.index, 1);
          this.setState({ cat3Statements: copyCat3 });
          //push selected statement onto the selected slot
          destinationSlot.statement.push({ id: copied3[0].id, content: copied3[0].content, category: 3, statementNumber: copied3[0].statementNumber });
          //remove already existing statement within the array
          if (destinationSlot.statement.length == 2) {
            var removed = destinationSlot.statement.splice(0, 1)
            //push removed back to cat1Statements
            if (removed[0].category == 1) {
              var copyCat1 = this.state.cat1Statements;
              copyCat1.push(removed[0])
              this.setState({ cat1Statements: copyCat1 });
            };
            if (removed[0].category == 2) {
              var copyCat2 = this.state.cat2Statements;
              copyCat2.push(removed[0])
              this.setState({ cat2Statements: copyCat2 });
            };
            if (removed[0].category == 23) {
              var copyCat3 = this.state.cat3Statements;
              copyCat3.push(removed[0])
              this.setState({ cat3Statements: copyCat3 });
            };
          }
        break;
      
      default:
        //console.log(destinationSlot)
        //RETURN ITEM
        if (destination.droppableId == 'ITEMS1') { 
          //push selected statement to cat1Statements
          var copyCat1 = this.state.cat1Statements;
          copyCat1.push(sourceSlot[0])
          this.setState({ cat1Statements: copyCat1 });
          //Remove selected statement from source
          this.state.anchors.map((anchor, index) => {
            anchor.slots.map((slot, i) => {
              if (slot.id == source.droppableId) {
                slot.statement.splice(0, 1)
              }
            })
          })
        }
        //RETURN ITEM
        else if (destination.droppableId == 'ITEMS2') { 
          //push selected statement to cat1Statements
          var copyCat2 = this.state.cat2Statements;
          copyCat2.push(sourceSlot[0])
          this.setState({ cat2Statements: copyCat2 });
          //Remove selected statement from source
          this.state.anchors.map((anchor, index) => {
            anchor.slots.map((slot, i) => {
              if (slot.id == source.droppableId) {
                slot.statement.splice(0, 1)
              }
            })
          })
        }
        //RETURN ITEM
        else if (destination.droppableId == 'ITEMS3') { 
          //push selected statement to cat1Statements
          var copyCat3 = this.state.cat3Statements;
          copyCat3.push(sourceSlot[0])
          this.setState({ cat3Statements: copyCat3 });
          //Remove selected statement from source
          this.state.anchors.map((anchor, index) => {
            anchor.slots.map((slot, i) => {
              if (slot.id == source.droppableId) {
                slot.statement.splice(0, 1)
              }
            })
          })
        }
        
        //MOVE ITEMS BETWEEN SLOTS
        else {
          const moved = move(
            sourceSlot,
            destinationSlot.statement,
            source,
            destination
          );
          //Remove moved statement from its previous location
          var sourceKey = Object.keys(moved)[0];
          this.state.anchors.map((anchor, index) => {
            anchor.slots.map((slot, i) => {
              if (slot.id == sourceKey) {
                slot.statement.splice(0, 1)
              }
            })
          })
          //move statement from one slot to another
          var destinationKey = Object.keys(moved)[1]
          var statementToMove = Object.values(moved)[1]
          this.state.anchors.map((anchor, index) => {
            anchor.slots.map((slot, i) => {
              if (slot.id == destinationKey) {
                slot.statement.push(statementToMove[0])
              }
            })
          });

          //SWAP ITEMS
          if (destinationSlot.statement.length == 2) {
            console.log('slot taken')
            var removed = destinationSlot.statement.splice(0, 1)
            //push removed back to cat1Statements
            console.log(removed)
            if (removed[0].category == 1) {
              var copyCat1 = this.state.cat1Statements;
              copyCat1.push(removed[0])
              this.setState({ cat1Statements: copyCat1 });
            };
            if (removed[0].category == 2) {
              var copyCat2 = this.state.cat2Statements;
              copyCat2.push(removed[0])
              this.setState({ cat2Statements: copyCat2 });
            };
            if (removed[0].category == 3) {
              var copyCat3 = this.state.cat3Statements;
              copyCat3.push(removed[0])
              this.setState({ cat3Statements: copyCat3 });
            };
            
          }
        }
        break;
    }

  };

  getSortResults = () => {
    console.log(this.state.anchors);

    var results = [];

    this.state.anchors.map((anchor, index) => {
      anchor.slots.map((slot, i) => {
        slot.statement.map((s, j) => {
          results.push({
            anchorNumber: anchor.anchorNumber,
            statement: s.content,
            statementNumber: s.statementNumber,
            surveyId: this.state.surveyID
          })
        })
      })
    })

    console.log(results)
    this.setState({ sortResults: results });
    
  };

  next = (e) => {
    this.getSortResults();
    e.preventDefault();

    const result = this.state.sortResults;
    var newResult = {};
    var success = [];
    for (var i = 0; i < result.length; i++){
      newResult = result[i];
      createResult(newResult)
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
  }

  render() {
     if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/Participant_Finish',
                }}/>
            )
        };
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container-white">
                <h1 className="sub-heading-blue-2">
                  Q-Sort
                </h1>
                <p className="sub-sub-heading-blue-2">Step 4 of 4</p>
              </div>
              <div className=' item6 navbar-container'>
                <Navbar/>
              </div>
            </div>

            

            <div className='center-2'>
              <p className='headings'>Survey Title</p>  
              <p className='survey-name'>{this.state.surveyName}</p>
              <div className='instructions-container'>
                <p className='survey-description'>
                  Grab a statement from one of the category
                   and drop it into chosen anchor point.
                  You can move statements around the Q-Board as many times as you wish
                  unitl you are satisfied with your sort.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: "center" }}> 
                <div>  
                  <DragDropContext onDragEnd={this.onDragEnd}>    
                    <div className='board-container'>
                        {this.state.anchors.map((list, i) => (
                          <div
                            key={list.id}
                            index={i}
                          >
                            <div className='anchors-container'>        
                              <div className='columns-anchors'>
                                <p className='anchor-number'>{list.anchorNumber}</p>
                                {list.slots.map((slot, j) => (
                                  <Droppable
                                    key={slot.id}
                                    droppableId={slot.id}
                                    index={j}
                                    // direction={"horizontal"} 
                                  >
                                    {(provided, snapshot) => (
                                      <div className='slot'
                                        style={{
                                          background: snapshot.isDraggingOver
                                          ? "#51E2C2"
                                          : "#fff",
                                        }}
                                      >
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          isDraggingOver={snapshot.isDraggingOver}
                                        >
                                          {slot.statement.map((item, k) => (
                                            <Draggable
                                              key={item.id}
                                              draggableId={item.id}
                                              index={k}
                                            >
                                              {(provided, snapshot) => ( 
                                                <div
                                                  className='dropped-statement'
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  isDragging={snapshot.isDragging}
                                                  
                                                >
                                                  {item.content}
                                                </div>  
                                              )}
                                            </Draggable>
                                          ))}
                                          {provided.placeholder}
                                        </div>
                                      </div>
                                    )}    
                                  </Droppable>
                                ))} 
                                
                              </div>
                              </div>
                          </div>    
                        ))}
                      
                    </div>
                    
                    <div style={{display:'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center'}}>
                      <Droppable
                        droppableId="ITEMS1"
                        // isDropDisabled={true}
                        direction={"horizontal"}
                      >
                        {(provided, snapshot) => (
                          <div
                            className='statements-container'
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            style={{
                                          background: snapshot.isDraggingOver
                                          ? "#51E2C2"
                                          : "#fff",
                                        }}
                          >
                            <div className='title-container'>
                              <h3 className='category-title'>Statements category 1</h3>
                            </div>
                            <div className='statements-holder'>
                              {this.state.cat1Statements.map((statement2, index) => (
                                <Draggable
                                  key={statement2.id}
                                  draggableId={statement2.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => ( 
                                    <div
                                      className='statement-card'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      style={{
                                        
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {statement2.content}
                                    </div>  
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>

                    <div style={{display:'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center'}}>
                      <Droppable
                        droppableId="ITEMS2"
                        // isDropDisabled={true}
                        direction={"horizontal"}
                      >
                        {(provided, snapshot) => (
                          <div
                            className='statements-container'
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            style={{
                                          background: snapshot.isDraggingOver
                                          ? "#51E2C2"
                                          : "#fff",
                                        }}
                          >
                            <div className='title-container'>
                              <h3 className='category-title'>Statements category 1</h3>
                            </div>
                            <div className='statements-holder'>
                              {this.state.cat2Statements.map((statement2, index) => (
                                <Draggable
                                  key={statement2.id}
                                  draggableId={statement2.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => ( 
                                    <div
                                      className='statement-card'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      style={{
                                        
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {statement2.content}
                                    </div>  
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>

                    <div style={{display:'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center'}}>
                      <Droppable
                        droppableId="ITEMS3"
                        // isDropDisabled={true}
                        direction={"horizontal"}
                      >
                        {(provided, snapshot) => (
                          <div
                            className='statements-container'
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            style={{
                                          background: snapshot.isDraggingOver
                                          ? "#51E2C2"
                                          : "#fff",
                                        }}
                          >
                            <div className='title-container'>
                              <h3 className='category-title'>Statements category 1</h3>
                            </div>
                            <div className='statements-holder'>
                              {this.state.cat3Statements.map((statement2, index) => (
                                <Draggable
                                  key={statement2.id}
                                  draggableId={statement2.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => ( 
                                    <div
                                      className='statement-card'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      style={{
                                        
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {statement2.content}
                                    </div>  
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                    
                    

                    </DragDropContext>
                </div>
              </div>
              <div>
                <button
                  className='next-btn'
                  onClick={this.next}>
                  Submit your sort
                </button>
              </div>
            </div>

        </div>
        )
    }
}