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
    //console.log(sourceClone)
    const destClone = Array.from(destination);
    //console.log(destClone)
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    //console.log(removed)
    destClone.splice(droppableDestination.index, 0, removed);
    //console.log(destClone)
    
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    //console.log(result)
    return result;
};


export default class Participant_Step3 extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyID: '',
      surveyName: '',
        
      category1: '',
      category2: '',
      category3: '',
      data: [],

      //statements: [],
      

      lists: {
        statements: 'statements',
        category1List: 'category1List',
        category2List: 'category2List',
        category3List: 'category3List',
      },

      tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
      },

      columns2: {
        'column-1': {
          id: 'column-1',
          title: 'Statements',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
          id: 'column-2',
          title: '',
          taskIds: []
        },
        'column-3': {
          id: 'column-3',
          title: '',
          taskIds: []
        },
        'column-4': {
          id: 'column-4',
          title: '',
          taskIds: []
        },
      },

      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
      statements: {},
      columns: {
        'column-1': { id: 'column-1', title: 'Statements', statementIds: [] },
        'column-2': { id: 'column-2', title: localStorage.getItem('CATEGORY1'), statementIds: [] },
        'column-3': { id: 'column-3', title: localStorage.getItem('CATEGORY2'), statementIds: [] },
        'column-4': { id: 'column-4', title: localStorage.getItem('CATEGORY3'), statementIds: [] },
      },
      
      category1List: [],
      category2List: [],
      category3List: [],
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

    this.getStatements();
  };

  getSurveyDetails (){
    this.setState({
      surveyName: localStorage.getItem('SURVEY_NAME'),
      surveyID: localStorage.getItem('SURVEY_ID'),
      category1: localStorage.getItem('CATEGORY1'),
      category2: localStorage.getItem('CATEGORY2'),
      category3: localStorage.getItem('CATEGORY3'),
    })
  };

  getStatements(e){
    //e.preventDefault()

    var surveyID = localStorage.getItem('SURVEY_ID');
    var statementsArr = [];
    var statementId = '';

      fetch("https://auto-q-survey-web.herokuapp.com/api/getStatements", {

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
            
            statementsArr.push({ id: i.toString(), content: data[i].statement })
            
            this.setState(prevState => ({
              statements: { ...prevState.statements, ...statementsArr },
            }));

            var keys = Object.keys(this.state.statements)
              for (var j = 0; j < keys.length; j++){  
                if (!(keys[j] in this.state.columns['column-1'].statementIds)) {
                  this.state.columns['column-1'].statementIds.push(keys[j])
                }     
              };

          };

          console.log(this.state.statements)
          console.log(this.state.columns)
        })
      .catch(error => console.log(error));
  };

  getList = id => this.state[this.state.lists[id]];
        //this.state[this.id2List[id]];
        

  // onDragEnd = result => {
  //   const { source, destination } = result;
  //   // dropped outside the list
  //   if (!destination) { return; };

  //   if (source.droppableId === destination.droppableId) {
  //     //console.log(destination.index)
  //     const items = reorder(
  //       this.getList(source.droppableId),
  //       source.index,
  //       destination.index
  //     );
  //     let state = { items };
  //     console.log(state)

  //     if (source.droppableId === 'category1List') {
  //       //state = { category1List: items };
  //       this.setState({category1List: items});
  //     } else {
  //       this.setState({statements: items});
  //     }

      

  //   }
  //   else {
  //     const result = move(
  //       this.getList(source.droppableId),
  //       this.getList(destination.droppableId),
  //       source,
  //       destination
  //     );

  //    // console.log(result)
  //     this.setState({
  //       statements: result.statements,
  //       category1List: result.category1List,
  //       category2List: result.category2List,
  //       category3List: result.category3List
  //     });
  //   }
  // };

  onDragEnd = (result) => {

    const { destination, source, draggableId } = result
    //console.log(result)

    //If card is dropped outside any column then return the card to the previous column
    if (!destination) { return };

    if ( destination.droppableId === source.droppableId &&
          destination.index === source.index) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newStatementIds = Array.from(start.statementIds)
      newStatementIds.splice(source.index, 1)
      newStatementIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        statementIds: newStatementIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startStatementIds = Array.from(start.statementIds)
    startStatementIds.splice(source.index, 1)
    const newStart = {
      ...start,
      statementIds: startStatementIds
    }

    const finishStatementIds = Array.from(finish.statementIds)
    finishStatementIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      statementIds: finishStatementIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    
    this.setState(newState)
  };

  next = () => {
    //Fit statemnents from columns into list of array
    var cat1Ids = Object.values(this.state.columns['column-2'].statementIds)
    var keys = Object.keys(this.state.statements)
    for (var i = 0; i < cat1Ids.length; i++) {
      if ((cat1Ids[i] in keys)) {
        var id = cat1Ids[i]
        this.state.category1List.push(this.state.statements[id])
      };
    };

    var cat2Ids = Object.values(this.state.columns['column-3'].statementIds)
    var keys = Object.keys(this.state.statements)
    for (var i = 0; i < cat2Ids.length; i++) {
      if ((cat2Ids[i] in keys)) {
        var id = cat2Ids[i]
        this.state.category2List.push(this.state.statements[id])
      };
    };

    var cat3Ids = Object.values(this.state.columns['column-4'].statementIds)
    var keys = Object.keys(this.state.statements)
    for (var i = 0; i < cat3Ids.length; i++) {
      if ((cat3Ids[i] in keys)) {
        var id = cat3Ids[i]
        this.state.category3List.push(this.state.statements[id])
      };
    };

    // console.log(this.state.category1List)
    // console.log(this.state.category2List)
    // console.log(this.state.category3List)

    if (this.state.columns['column-1'].statementIds.length === 0) {
      console.log(this.state.columns['column-1'])
      localStorage.setItem('CATEGORY1_STATEMENTS', JSON.stringify(this.state.category1List));
      localStorage.setItem('CATEGORY2_STATEMENTS', JSON.stringify(this.state.category2List));
      localStorage.setItem('CATEGORY3_STATEMENTS', JSON.stringify(this.state.category3List));
      this.setState({ Redirect: true });
    }
    else {
      alert('Please complete the pre-sort')
      console.log(this.state.columns['column-1'])
    }

  };


  render() {
    if (this.state.Redirect) {
      return (
        <Redirect to={{
          pathname: '/Participant_Step4_Second',
        }}/>
      )
    };
       
        return (

            <div>
            <div className='grid-container'>
              <div className="item1 sub-header-container-white">
                <h1 className="sub-heading-blue-2">
                  Pre-Sort
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

              <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{display: 'flex'}}>
                  {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId]
                    const statements = column.statementIds.map(
                      (statementId) => this.state.statements[statementId]
                    )

                    return (
                      <div className='column'>
                        <h2 className='column-name'>{column.title}</h2>
                        <Droppable droppableId={column.id} type="TASK">
                          {(provided, snapshot) => (
                            <div className='statements-holder1'
                              style={{
                                 background: snapshot.isDraggingOver
                                  ? "#fff"
                                  : "transparent",
                              }}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              isDraggingOver={snapshot.isDraggingOver}
                            >
                              {statements.map((statement, index) => (   
                                <Draggable
                                  key={statement.id}
                                  draggableId={statement.id}
                                  index={index}                                 
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      className='statement-card1'  
                                      style={{
                                          backgroundColor: snapshot.isDragging
                                            ? "#51E2C2"
                                            : "#fff",
                                            ...provided.draggableProps.style
                                        }}
                                      >
                                        {statement.content}
                                      </div>
                                    )}
                                  </Draggable>
                                // <Task key={task.id} task={task} index={index} />
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                      // <Column key={column.id} column={column} tasks={tasks} />
                    )
                  })}
                </div>
              </DragDropContext>
              {/* <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="statements">
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                                marginLeft: 20
                              }}
                          >
                              {this.state.statements.map((item, index) => (
                                  <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}>
                                      {(provided, snapshot) => (
                                          <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{ userSelect: "none", padding: 16, margin: "0 0 8px 0", minHeight: "50px",
                                                        backgroundColor: snapshot.isDragging
                                                          ? "#263B4A"
                                                          : "#456C86",
                                                        color: "white",
                                                        ...provided.draggableProps.style
                                              }}
                                          >
                                              {item.statement}
                                          </div>
                                      )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                          </div>
                      )}
                  </Droppable>
                  <Droppable droppableId="category1List">
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                                marginLeft: 20
                              }}
                          >
                              {this.state.category1List.map((item, index) => (
                                  <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}>
                                      {(provided, snapshot) => (
                                          <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{ userSelect: "none", padding: 16, margin: "0 0 8px 0", minHeight: "50px",
                                                        backgroundColor: snapshot.isDragging
                                                          ? "#263B4A"
                                                          : "#456C86",
                                                        color: "white",
                                                        ...provided.draggableProps.style
                                              }}
                                          >
                                              {item.statement}
                                          </div>
                                      )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                          </div>
                      )}
                  </Droppable>
              </DragDropContext>
            </div>    */}

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