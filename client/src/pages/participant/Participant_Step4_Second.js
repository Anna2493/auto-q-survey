import React from "react";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import uuid from 'react-uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

      category1List: [],
      category2List: [],
      category3List: [],

      columnOrder: ['column-1', 'column-2', 'column-3'],
      columns: {
        'column-1': { id: 'column-1', title: localStorage.getItem('CATEGORY1'), statementIds: [] },
        'column-2': { id: 'column-2', title: localStorage.getItem('CATEGORY2'), statementIds: [] },
        'column-3': { id: 'column-3', title: localStorage.getItem('CATEGORY3'), statementIds: [] },
      },

      cat1Statements: {},
      cat2Statements: {},
      cat3Statements: {},

      anchors2: [
            { id: '0', anchorNumber: -3, slots: [{ id: '0', statement: [] }] },
            { id: '1', anchorNumber: -2, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }] },
            { id: '2', anchorNumber: -1, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '3', anchorNumber: 0, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }, { id: '3', statement: [] }] },
            { id: '4', anchorNumber: 1, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '5', anchorNumber: 2, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }] },
            { id: '6', anchorNumber: 3, slots: [{ id: '0', statement: [] }] },
          ],

      statements1: {},

      anchors3: {
        ['anchor-1']: [],
        ['anchor-2']: [],
        ['anchor-3']: [],
      },
      

       anchors4: [
        {
          anchors: [
            { id: '0', anchorNumber: -3, slots: [{ id: '0', statement: [] }] },
            { id: '1', anchorNumber: -2, slots: [{ id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '2', anchorNumber: -1, slots: [{ id: '3', statement: [] }, { id: '4', statement: [] }, { id: '5', statement: [] }] },
            { id: '3', anchorNumber: 0, slots: [{ id: '6', statement: [] }, { id: '7', statement: [] }, { id: '8', statement: [] }, { id: '9', statement: [] }] },
            { id: '4', anchorNumber: 1, slots: [{ id: '10', statement: [] }, { id: '11', statement: [] }, { id: '12', statement: [] }] },
            { id: '5', anchorNumber: 2, slots: [{ id: '13', statement: [] }, { id: '14', statement: [] }] },
            { id: '6', anchorNumber: 3, slots: [{ id: '15', statement: [] }] },
          ],
          
          cat1: [
            { id: '16', content: 'Statement 1' },
            { id: '17', content: 'Statement 2' },
          ], 
          cat2: [
            { id: '18', content: 'Statement 3' },
            { id: '19', content: 'Statement 4' },
          ],
          cat3: [
            { id: '20', content: 'Statement 5' },
            { id: '21', content: 'Statement 6' },
          ]

        },
      ],
       
      anchors5: [
            { id: '0', anchorNumber: -3, slots: [{ id: '0', statement: [] }] },
            { id: '1', anchorNumber: -2, slots: [{ id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '2', anchorNumber: -1, slots: [{ id: '3', statement: [] }, { id: '4', statement: [] }, { id: '5', statement: [] }] },
            { id: '3', anchorNumber: 0, slots: [{ id: '6', statement: [] }, { id: '7', statement: [] }, { id: '8', statement: [] }, { id: '9', statement: [] }] },
            { id: '4', anchorNumber: 1, slots: [{ id: '10', statement: [] }, { id: '11', statement: [] }, { id: '12', statement: [] }] },
            { id: '5', anchorNumber: 2, slots: [{ id: '13', statement: [] }, { id: '14', statement: [] }] },
            { id: '6', anchorNumber: 3, slots: [{ id: '15', statement: [] }] },  
      ],
      cat1statements2: [
        { id: '0', content: 'Statement 1' },
        { id: '1', content: 'Statement 2' },
        { id: '2', content: 'Statement 3' },
        { id: '3', content: 'Statement 4' },
        { id: '4', content: 'Statement 5' },
        { id: '5', content: 'Statement 6' },
        { id: '6', content: 'Statement 7' },
        { id: '7', content: 'Statement 8' },
        { id: '8', content: 'Statement 9' },
        { id: '9', content: 'Statement 10' },
        { id: '10', content: 'Statement 11' },
      ],
      
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

    const i = this.state.anchors4.map((item, i) => {
      {
        item.anchors.map((anchor, j) => {
          {
            anchor.slots.map((slot, k) => {
              console.log(slot.id)
          })}
      })}
    })

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
              array.push({ id: j.toString() });
            }
            anchorsArr3.push({ id: i.toString(), anchorNumber: data[i].anchor, slots: array });
            
          };
           //Get statements for category 1
            var statements = localStorage.getItem('CATEGORY1_STATEMENTS')
            var statementsCat1 = JSON.parse(statements)
            //console.log(statementsCat1)
            //this.setState({ category1List : statementsCat1 })
            
            
            for (var i = 0; i < statementsCat1.length; i++){
              cat1Items.push({ id: i.toString(), content: statementsCat1[i].content });

              this.setState(prevState => ({
                cat1Statements: { ...prevState.cat1Statements, ...cat1Items }
              }));

              var keys = Object.keys(this.state.cat1Statements);
              for (var j = 0; j < keys.length; j++){
                if (!(keys[j] in this.state.columns['column-1'].statementIds)) {
                  this.state.columns['column-1'].statementIds.push(keys[j])
                }
              };
          };  
          
          //console.log(this.state.cat1Statements)

          this.sort('anchorNumber', anchorsArr3)
          this.setState({ anchors: anchorsArr3 });
          //this.state.anchors.push({category1: categories})
          console.log(this.state.cat1Statements);
          //console.log(this.state.columns)
          console.log(this.state.anchors2)
          
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

  // onDragEnd = (result) => {

  //   const { destination, source, draggableId } = result
  //     console.log(this.state.anchors2)
  //     console.log(this.state.columns)

  //   //If card is dropped outside any column then return the card to the previous column
  //   if (!destination) { return };

  //   if ( destination.droppableId === source.droppableId &&
  //         destination.index === source.index) {
  //     return
  //   }

  //   const start = this.state.columns[source.droppableId]
  //   const finish = this.state.columns[destination.droppableId]

  //   if (start === finish) {
  //     const newStatementIds = Array.from(start.statementIds)
  //     newStatementIds.splice(source.index, 1)
  //     newStatementIds.splice(destination.index, 0, draggableId)

  //     const newColumn = {
  //       ...start,
  //       statementIds: newStatementIds
  //     }

  //     const newState = {
  //       ...this.state,
  //       columns: {
  //         ...this.state.columns,
  //         [newColumn.id]: newColumn
  //       }
  //     }

  //     this.setState(newState)
  //     return
  //   }

  //   // Moving from one list to another
  //   const startStatementIds = Array.from(start.statementIds)
  //   startStatementIds.splice(source.index, 1)
  //   const newStart = {
  //     ...start,
  //     statementIds: startStatementIds
  //   }

  //   const finishStatementIds = Array.from(finish.statementIds)
  //   finishStatementIds.splice(destination.index, 0, draggableId)
  //   const newFinish = {
  //     ...finish,
  //     statementIds: finishStatementIds
  //   }

  //   const newState = {
  //     ...this.state,
  //     columns: {
  //       ...this.state.columns,
  //       [newStart.id]: newStart,
  //       [newFinish.id]: newFinish
  //     }
  //   }

    
  //   this.setState(newState)
  // };

  //   onDragEnd(result) {
  //   // dropped outside the list
  //   console.log(result);
  //   console.log("innner drag");
  //   if (!result.destination) {
  //     return;
  //   }
  //   const sourceIndex = result.source.index;
  //   const destIndex = result.destination.index;
  //   if (result.type === "droppableItem") {
  //     const items = reorder(this.state.items, sourceIndex, destIndex);

  //     this.setState({
  //       items
  //     });
  //   } else if (result.type === "droppableSubItem") {
  //     const itemSubItemMap = this.state.items.reduce((acc, item) => {
  //       acc[item.id] = item.subItems;
  //       return acc;
  //     }, {});

  //     const sourceParentId = parseInt(result.source.droppableId);
  //     const destParentId = parseInt(result.destination.droppableId);

  //     const sourceSubItems = itemSubItemMap[sourceParentId];
  //     const destSubItems = itemSubItemMap[destParentId];

  //     let newItems = [...this.state.items];

  //     /** In this case subItems are reOrdered inside same Parent */
  //     if (sourceParentId === destParentId) {
  //       const reorderedSubItems = reorder(
  //         sourceSubItems,
  //         sourceIndex,
  //         destIndex
  //       );
  //       newItems = newItems.map(item => {
  //         if (item.id === sourceParentId) {
  //           item.subItems = reorderedSubItems;
  //         }
  //         return item;
  //       });
  //       this.setState({
  //         items: newItems
  //       });
  //     } else {
  //       let newSourceSubItems = [...sourceSubItems];
  //       const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

  //       let newDestSubItems = [...destSubItems];
  //       newDestSubItems.splice(destIndex, 0, draggedItem);
  //       newItems = newItems.map(item => {
  //         if (item.id === sourceParentId) {
  //           item.subItems = newSourceSubItems;
  //         } else if (item.id === destParentId) {
  //           item.subItems = newDestSubItems;
  //         }
  //         return item;
  //       });
  //       this.setState({
  //         items: newItems
  //       });
  //     }
  //   }
  // }

  onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source, destination)
    // dropped outside the list
    if (!destination) {
      return;
    };

    //Find the index of anchors5 object and slots given the destinarion only
    var slotPosition;
    var destinationSlot;
    this.state.anchors5.map((anchor, index) => {
      anchor.slots.map((slot, i) => {
        if (slot.id == destination.droppableId) {
          slotPosition = i;
          destinationSlot = slot
        };
      });
    });

    var sourceSlotPostion;
    var sourceSlot;
    this.state.anchors5.map((anchor, index) => {
      anchor.slots.map((slot, i) => {
        if (slot.id == source.droppableId) {
          sourceSlotPostion = i;
          sourceSlot = slot.statement
        }
      })
    })
    
    //console.log(sourceSlot)
    
    switch (source.droppableId) {
      case 'ITEMS':
        const copied = copy(
          this.state.cat1statements2,
          destinationSlot.statement,
          source,
          destination
        );
        //Remove selected statement from the array
        var copyCat1 = this.state.cat1statements2;
        copyCat1.splice(source.index, 1);
        this.setState({ cat1statements2: copyCat1 });
        //push selected statement onto the selected slot
        destinationSlot.statement.push({ id:copied[0].id, content: copied[0].content });
      
        break;
      default:
        const moved = move(
          sourceSlot,
          destinationSlot.statement,
          source,
          destination
        );
        console.log(sourceSlot)
        console.log(destinationSlot.statement)
        console.log(source)
        console.log(destination)
        
    }
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

              <div style={{ display: 'flex', justifyContent: "center" }}> 
                <div>  
                  <DragDropContext onDragEnd={this.onDragEnd}>    
                    <div
                      style={{
                        border: '1px solid black',
                        padding: 10,
                        display: 'flex',
                        textAlign: 'center',
                        flexDirection: 'row',
                      }}
                    >
                        {this.state.anchors5.map((list, i) => (
                          <div
                            key={list.id}
                            index={i}
                          >
                            <div
                              style={{
                                border: '1px solid black',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: 'center',
                                padding: 10,
                                textAlign: 'center',
                                margin: "0 0 8px 0",
                                padding: 10
                              }}
                            >        
                              <div
                                style={{
                                  background: 'lightGrey',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: "center",
                                  alignItems: 'center',
                                  padding: 10
                                }}
                              >
                                {list.anchorNumber}
                                {list.slots.map((slot, j) => (
                                  <Droppable
                                    key={slot.id}
                                    droppableId={slot.id}
                                    index={j}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        style={{
                                          border: '1px solid black',
                                          height: 80,
                                          width: 100,
                                          background: snapshot.isDraggingOver
                                          ? "lightCoral"
                                          : "lightgreen",
                                          margin: "0 0 8px 0",
                                        }}
                                      >
                                        <div
                                          ref={provided.innerRef}
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
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  isDragging={snapshot.isDragging}
                                                  style={{
                                                    userSelect: "none",
                                                    padding: 8,
                                                    margin: "0 0 0 8px",
                                                    height: 60,
                                                    width: 100,
                                                    backgroundColor: 'lightsalmon',
                                                    color: "white",
                                                    textAlign:'center',
                                                    ...provided.draggableProps.style,
                                                  }}
                                                >
                                                  {item.content}
                                                </div>  
                                              )}
                                            </Draggable>
                                            // <div key={k}>
                                            //   {item.content}
                                            // </div>
                                          ))}

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
                    
                    <div style={{display:'flex', justifyContent: "center", flexDirection: 'column'}}>
                      <Droppable
                        droppableId="ITEMS"
                        // isDropDisabled={true}
                        direction={"horizontal"}
                      >
                        {(provided, snapshot) => (
                          <div
                            style={{
                              border: '1px solid lightGrey',
                              padding: 10,
                              width: 1000,
                              display: 'flex',
                              flexDirection: 'row',
                            }}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                          >
                            <div style={{ textAlign: 'center' }}>
                              <h3>Statements category 1</h3>
                            </div>
                            <div
                              style={{
                                border: '1px solid black',
                                padding: 10,
                                display: 'flex',
                                flexDirection: 'row',
                                width: 1010,
                                overflowX: 'auto',
                                margin: "0 0 0 20px",
                              }}
                            >
                              {this.state.cat1statements2.map((statement2, index) => (
                                <Draggable
                                  key={statement2.id}
                                  draggableId={statement2.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => ( 
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      style={{
                                        userSelect: "none",
                                        padding: 8,
                                        margin: "0 0 0 8px",
                                        height: 60,
                                        width: 100,
                                        backgroundColor: 'lightsalmon',
                                        color: "white",
                                        textAlign:'center',
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {statement2.content}
                                    </div>  
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                    
                    

                    </DragDropContext>
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