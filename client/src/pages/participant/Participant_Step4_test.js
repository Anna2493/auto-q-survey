import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  //console.log(result)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
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

const grid = 8;

const Content = styled.div`
    margin-right: 200px;
`;

const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`;

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

const Handle = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem 0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    border-right: 1px solid #ddd;
    color: #000;
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    
    width: 200px;
`;

const Container = styled(List)`
    margin: 0.5rem 0.5rem 1.5rem;
    background: lightBlue;
    
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 0.5rem;
    margin: 0 0.5rem 0.5rem;
    border: 1px solid transparent;
    line-height: 1.5;
    color: #aaa;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 0.5rem;
    color: #000;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
`;

const ButtonText = styled.div`
    margin: 0 1rem;
`;

const ITEMS = [
    {
        id: '0',
        content: 'Headline'
    },
    {
        id: '1',
        content: 'Copy'
    },
    {
        id: '2',
        content: 'Image'
    },
    {
        id: '3',
        content: 'Slideshow'
    },
    {
        id: '4',
        content: 'Quote'
    }
];

export default class Participant_Step4_test extends Component {
  constructor() {
    super();
    this.state = {
      //[uuid()]: [],
      anchors: [
        { id: 'anchor-1', statements: [] }, { id: 'anchor-2', statements: [] }, { id: 'anchor-3', statements: [] },
      ],

      anchors2: {
        ['anchor-1']: [],
        ['anchor-2']: [],
        ['anchor-3']: [],
    },
    anchors3: [
      {id: '1'},{id: '2'}    
      ],
      cat1statements: [
        {
            id: '0',
            content: 'Statement 1'
        },
        {
            id: '1',
            content: 'Statement 2'
        },
      ]
      // ],
      // cat2statements: [
      //   {
      //     id: '0',
      //     content: 'Statement 3'
      //   },
      //   {
      //       id: '1',
      //       content: 'Statement 4'
      //   },
        
      // ]
    }
  }
    // state = {
    //   ['0']: [],
    //   ['1']: [],
        
    // };
  componentDidMount() {
   console.log(this.state.anchors2)
  }


  onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(source, destination)
    // dropped outside the list
    if (!destination) {
      return;
    };

    
    //Refactor This switch statement! 
    // switch (source.droppableId) {
      
    //   case destination.droppableId:
    //     const reordered = reorder(
    //       this.state.anchors2[destination.droppableId],
    //       source.index,
    //       destination.index
    //     )

    //     //console.log(reordered)
    //     // var object = {};
    //     // var newArray = [];
    //     // for (var i = 0; i < reordered.length; i++) {
    //     //   object = { id: reordered[i].id, content: reordered[i].content };
    //     //   newArray.push(object)
    //     // };
    //     // console.log(newArray)

    //     var arr = this.state.anchors2[destination.droppableId]
    //     //arr.splice(0, 1, reordered)
    //     //this.setState({ anchors2: [...this.state.anchors2[destination.droppableId], reordered ]});
    //     console.log(arr)
    //     arr.splice(0, arr.length, reordered)
    //     console.log(arr)
    //       // this.setState({
    //       //   [destination.droppableId]: reorder(
    //       //     this.state.anchors2[source.droppableId],
    //       //     source.index,
    //       //     destination.index
    //       //   )
    //       // });
    //       break;
        
    //   case 'ITEMS':
    //         const copied = copy(
    //             this.state.cat1statements,
    //             this.state.anchors2[destination.droppableId],
    //             source,
    //             destination
    //         );
    //         console.log(copied);
    //         var object = { id: uuid(), content: copied[0].content};
    //         // for (var i = 0; i < copied.length; i++) {
    //         //     object = { id: uuid(), content: copied[i].content };
    //         // };
            
    //         //Remove selected item from the initiall list
    //         var copyCat1 = this.state.cat1statements;
    //         copyCat1.splice(source.index, 1);
    //         this.setState({ cat1statements: copyCat1 });
    //         this.state.anchors2[destination.droppableId].unshift(object);
    //         //this.state.cat1statements.splice(source.index, 1)
    //         break;
      
    //   default:
    //         const moved = move(
    //             this.state.anchors2[source.droppableId],
    //             this.state.anchors2[destination.droppableId],
    //             source,
    //             destination
    //         );
    //         this.setState({ anchors2: moved });
    //     break;
    // }

    //console.log(this.state.anchors2);

    
  };

    addList = e => {
      //this.setState({ [uuid()]: [] });
      //console.log(this.state.anchors2);
    console.log(this.state.cat1statements);
  };

    render() {
        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{ marginRight: 200 }}>
                    {this.state.anchors3.map((list, i) => (
                        <Droppable
                            key={list.id}
                            droppableId={list.id}
                            direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        style={{
                                            margin: 8,
                                            border: '1px solid black',
                                            borderRadius: 2,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            padding: 10,
                                            textAlign: 'center'
                                        }}>
                                    
                                <div
                                    style={{
                                        background: 'lightGrey',
                                        height: 50,
                                        minWidth: 150
                                    }}
                                    ref={provided.innerRef}
                                        isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {/* {this.state.anchors2[list].length
                                        ? this.state.anchors2[list].map(
                                              (item, index) => (
                                                  <Draggable
                                                      key={item.id}
                                                      draggableId={item.id}
                                                      index={index}>
                                                      {(provided, snapshot) => (
                                                          <Item
                                                              ref={provided.innerRef}
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              isDragging={snapshot.isDragging}
                                                              style={provided
                                                                      .draggableProps
                                                                      .style
                                                              }>
                                                            
                                                              {item.content}
                                                          </Item>
                                                      )}
                                                  </Draggable>
                                              )
                                          )
                                        : !provided.placeholder && (
                                              <Notice>Drop items here</Notice>
                                          )} */}
                                    {provided.placeholder}
                                </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
                <div style={{display:'flex'}}>

                    <Droppable
                        droppableId="ITEMS"
                        isDropDisabled={true}
                    >
                    {(provided, snapshot) => (
                            <div
                                style={{
                                    width: 200,
                                    border: '1px solid lightGrey',
                                    padding: 10
                                }}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <h3>Statements category 1</h3>
                                </div>    
                           
                            
                            {this.state.cat1statements.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                    )}
                                    
                                        </React.Fragment>
                                    )}
                                    
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
              
              </div>
            </DragDropContext>
        );
    }
}

// Put the things into the DOM!
//ReactDOM.render(<App />, document.getElementById('root'));