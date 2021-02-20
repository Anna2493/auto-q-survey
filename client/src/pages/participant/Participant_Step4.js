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
      cat1statements2: [
        {
            id: '0',
            content: 'Statement 1'
        },
        {
            id: '1',
            content: 'Statement 2'
        },
      ],

       anchors4: [
        {
          anchors: [
            { id: '0', anchorNumber: -3, slots: [{ id: '0', statement: [] }] },
            { id: '1', anchorNumber: -2, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }] },
            { id: '2', anchorNumber: -1, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '3', anchorNumber: 0, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }, { id: '3', statement: [] }] },
            { id: '4', anchorNumber: 1, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }, { id: '2', statement: [] }] },
            { id: '5', anchorNumber: 2, slots: [{ id: '0', statement: [] }, { id: '1', statement: [] }] },
            { id: '6', anchorNumber: 3, slots: [{ id: '0', statement: [] }] },
          ],
          
          cat1: [
            { id: '0', content: 'Statement 1' },
            { id: '1', content: 'Statement 2' },
          ], 
          cat2: [
            { id: '2', content: 'Statement 3' },
            { id: '3', content: 'Statement 4' },
          ],
          cat3: [
            { id: '4', content: 'Statement 5' },
            { id: '5', content: 'Statement 6' },
          ]

        },
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

    
    //Refactor This switch statement! 
    switch (source.droppableId) {        
      case 'ITEMS':
            const copied = copy(
                this.state.cat1statements,
                this.state.anchors2[destination.droppableId],
                source,
                destination
            );
            console.log(copied);
            var object = { id: uuid(), content: copied[0].content};
            // for (var i = 0; i < copied.length; i++) {
            //     object = { id: uuid(), content: copied[i].content };
            // };
            
            //Remove selected item from the initiall list
            var copyCat1 = this.state.cat1statements;
            copyCat1.splice(source.index, 1);
            this.setState({ cat1statements: copyCat1 });
            this.state.anchors2[destination.droppableId].unshift(object);
            //this.state.cat1statements.splice(source.index, 1)
            break;
      
      default:
            const moved = move(
                this.state.anchors2[source.droppableId],
                this.state.anchors2[destination.droppableId],
                source,
                destination
            );
            this.setState({ anchors2: moved });
        break;
    }

    //console.log(this.state.anchors2);

    
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
                  {/* <div                       
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
                    {this.state.anchors2.map((item, index) => (
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: "center",
                                  }}
                                  >
                                  {item.slots.map((slot, index) => (
                                      
                                      <Droppable
                                        key={slot.id}
                                        droppableId={slot.id}
                                        index={index}
                                        type='SLOT'
                                      >
                                        {(provided, snapshot) => (
                                          <div style={{ display: "flex", justifyContent: "center" }}>
                                            <div
                                              ref={provided.innerRef}
                                              style={{
                                                userSelect: "none",
                                                padding: 10,
                                                margin: "0 0 8px 0",
                                                minHeight: 50,
                                                minWidth: 100,
                                                backgroundColor: "skyblue",
                                                color: "white",
                                            }}
                                            isDraggingOver={snapshot.isDraggingOver}
                                          >
                      
                                            
                                            </div>
                                              {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                  ))}
                                  </div> 
                                
                              </div>
                            </div>                                
                          </div>                           
                      </div>
                    ))}
                   
                    </div> 
                    
              
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      {this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId]
                        const statements = column.statementIds.map(
                          (statementId) => this.state.cat1Statements[statementId]
                        )

                        return (
                          <div
                            style={{
                              margin: 8,
                              border: '1px solid lightgrey',
                              borderRadius: 2,
                              minWidth: 220,
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'row',
                              padding: 8
                            }}
                          >
                            <h2>{column.title}</h2>
                            <Droppable droppableId={column.id} type='CARD' direction="horizontal">
                              {(provided, snapshot) => (
                                <div
                                  style={{
                                    minWidth: 100,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: 8,
                                    transition: 'background-color 0.2s ease',
                                    backgroundColor: 'skyblue',
                                    flexGrow: 1,
                                    height: 100,
                                    // Add overflow
                                  }}
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  isDraggingOver={snapshot.isDraggingOver}
                                >
                                  {statements.map((statement, i) => (
                                    <Draggable
                                      key={statement.id}
                                      draggableId={statement.id}
                                      index={i}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 0 8px",
                                            height: 60,
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                              color: "white",
                                              ...provided.draggableProps.style,
                                              
                                            }}
                                          >
                                          {statement.content}
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                        )
                      })}                     
                    </div> */}
                    
                    <div                       
                      style={{
                        margin: 8,
                        border: '1px solid black',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 10,
                        textAlign: 'center',
                      }}
                    >
                    {this.state.anchors4.map((item, index) => (
                      <div key={index}>
                        {item.anchors.map((anchor, i) => (
                          <div
                            style={{
                              userSelect: "none",
                              padding: 10,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              backgroundColor: 'grey',
                            }}
                          >
                            {anchor.anchorNumber}
                            <div
                              style={{
                                userSelect: "none",
                                padding: 10,
                                margin: "0 0 8px 0",
                                minHeight: 50,
                                width: 110,
                                backgroundColor: 'lightGrey',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: "center",
                              }}
                            >
                              {anchor.slots.map((slot, index) => (
                                <Droppable
                                  key={slot.id}
                                  droppableId={slot.id}
                                  index={index}
                                  type='SLOT'
                                >
                                {(provided, snapshot) => (
                                  <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div
                                      ref={provided.innerRef}
                                      style={{
                                        userSelect: "none",
                                        padding: 10,
                                        margin: "0 0 8px 0",
                                        minHeight: 50,
                                        minWidth: 100,
                                        backgroundColor: "skyblue",
                                        color: "white",
                                      }}
                                      isDraggingOver={snapshot.isDraggingOver}
                                    >
                                    </div>
                                  {provided.placeholder}
                                  </div>
                                )}
                                </Droppable>
                              ))}
                            </div>
                          </div>
                        ))}
                                          
                        {/* This can be wrapped in a div with a title of the category */}
                        {item.cat1.map((statement, j) => (
                          <Droppable
                            key={statement.id}
                            droppableId={statement.id}
                            index={j}
                            type='CARD'
                          >
                            {(provided, snapshot) => (
                              <div style={{ display: "flex", justifyContent: "center" }}>
                                <div
                                  ref={provided.innerRef}
                                  style={{
                                    userSelect: "none",
                                    padding: 10,
                                    margin: "0 0 8px 0",
                                    minHeight: 50,
                                    minWidth: 100,
                                    backgroundColor: "skyblue",
                                    color: "white",
                                  }}
                                  isDraggingOver={snapshot.isDraggingOver}
                                  {...provided.droppableProps}
                                >
                                  <Draggable
                                      key={statement.id}
                                      draggableId={statement.id}
                                      index={j}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 0 8px",
                                            height: 60,
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                              color: "white",
                                              ...provided.draggableProps.style,
                                              
                                            }}
                                          >
                                          {statement.content}
                                        </div>
                                      )}
                                    </Draggable>
                                </div>
                              {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        ))}
                      </div>
                    ))}  
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