import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createAnchor, getSurveys } from '../BackendFunctions';
//TODO fix direct mutation of the state
export default class CreateSurvey_Step2 extends React.Component {
    constructor() {
        super();
        this.state = {
            positiveBoard: [],
            neutralBoard: [
                {
                    neutral:0,
                    slot: [{}],
                }
            ],
            negativeBoard: [],
            reversedBoard: [],
            
            anchor: [],
            //slot: 1,
            slot: [{}],
            slot1: 1,
            
            positive: 0,
            negative: 0,
            totalSlots: 1,
            anchorsList: [],
            surveysIDs: [],
            surveyID: '',
            surveyCode: '',
        }

        this.postNewBoard = this.postNewBoard.bind(this);
        this.getSurveyId = this.getSurveyId.bind(this);
        
    }

    componentDidMount() {
        
        this.getSurveyId();
    }

    getSurveyId() {       
        const requestSurveys = {
            adminID: localStorage.getItem('ADMIN_ID')
        };   
        getSurveys(requestSurveys);
    };



    addAnchor() {
        
        //console.log(this.state.positiveBoard)
        /*
         * This method is called when the button "add anchor" is pressed
         * positiveBoard is field with: positive and slot
         * negativeBoard is field with: negative and slot
         * positive and negative are anchors headings 
         * positive is incremented by 1 each time this method is called
         * negative is decremented by 1 each time this method is called
         */
    
        //*---POSITIVE BOARD SETUP---

        this.state.positive = this.state.positive + 1;
        this.state.positiveBoard.push({
          positive: this.state.positive, 
          slot: this.state.slot
        })
        //The state is updated to keep the process "live"
        this.setState({
          positiveBoard: this.state.positiveBoard
        }) 
        this.state.totalSlots = this.state.totalSlots + 1;
        //console.log(this.state.positiveBoard)
        //console.log(this.state.negativeBoard)
        
        //*---NEGATIVE BOARD SETUP---
        //console.log(this.state.negativeBoard)
        var negative = this.state.negative;
        negative = negative - 1;
        this.state.negative = negative

        console.log(this.state.negativeBoard)
        console.log(this.state.reversedBoard)
        console.log(this.state.negative)
        
        this.state.negativeBoard.push({
            negative: this.state.negative,
            slot: this.state.slot
        })
        
        this.setState({
            negativeBoard: this.state.negativeBoard
        })
        this.state.totalSlots = this.state.totalSlots + 1;
        //negativeBoard items must be reversed so they are 
        //displayed backwards: 
        //negativeBoard: [ -1, -2, -3]     =>     reversedBoard: [ -3, -2, -1]
        //var negative_board = this.state.negativeBoard;

        //console.log(negative_board)
        this.state.reversedBoard = [...this.state.negativeBoard].reverse()
        this.setState({
            reversedBoard: this.state.reversedBoard
        })
        //console.log(this.state.reversedBoard)
        // var negative_board = this.state.negativeBoard;
        // console.log([...negative_board].reverse())
    }

    addPositiveSlot(index) {
        //copy the 'slot' object from the board at specified index
        var copyPositiveBoard = [...this.state.positiveBoard[index].slot]
        //then push another object to the copied slot object
        copyPositiveBoard.push({})
        //Asign the copied slot objects with new slots added
        //to the board array at a specfied index
        this.state.positiveBoard[index].slot = copyPositiveBoard
        this.setState({
            positiveBoard: this.state.positiveBoard,
        })    
        this.state.totalSlots = this.state.totalSlots + 1;
    };

    removePositiveSlot(index) {
        //copy the 'slot' object from the board at specified index
        var copyPositiveBoard = [...this.state.positiveBoard[index].slot]
        //then push another object to the copied slot object
        copyPositiveBoard.splice(-1, 1)
        var length = copyPositiveBoard.length
        // if (length < 1) {
        //     this.state.positiveBoard.splice(index, 1);
        //     // this.state.positiveBoard[index].positive = this.state.positiveBoard[index].positive - 1
        //     this.setState({
        //         positiveBoard: this.state.positiveBoard
        //     });
        //     console.log(this.state.positiveBoard)
        // }
        // else {
            //Asign the copied slot objects with new slots added
            //to the board array at a specfied index
            this.state.positiveBoard[index].slot = copyPositiveBoard
            this.setState({
                positiveBoard: this.state.positiveBoard,
            })
            this.state.totalSlots = this.state.totalSlots - 1;
        //};
    };


    addNegativeSlot(x){

        //*Log the index number
        //console.log(x)
        /*
         * copy the 'slot' object from the board at specified index
         */
        var copyReversedBoard = [...this.state.reversedBoard[x].slot]
        //*then push another object to the copied slot object
        copyReversedBoard.push({})
        //console.log(copyReversedBoard)
        //*Asign the copied slot objects with new slots added
        //*to the board array at a specfied index
        this.state.reversedBoard[x].slot = copyReversedBoard
       //console.log(this.state.reversedBoard[x])
        this.setState({
            reversedBoard: this.state.reversedBoard
        })
        
        this.state.totalSlots = this.state.totalSlots + 1;
        //console.log(this.state.totalSlots)
    };

    removeNegativeSlot(x){
        //*Log the index number
        //console.log(x)
        /*
         * copy the 'slot' object from the board at specified index
         */
        var copyReversedBoard = [...this.state.reversedBoard[x].slot]
        //*then remove last object from the copied slot object
        copyReversedBoard.splice(-1, 1)
        var length = copyReversedBoard.length
        // if (length < 1) {
            
        //     this.state.negativeBoard.splice(x, 1);
        //     this.state.reversedBoard.splice(x, 1);
        //     this.setState({
                
        //         negativeBoard: this.state.negativeBoard,
        //         reversedBoard: this.state.reversedBoard,
        //     });

        //     // var negative = this.state.negative;
        //     // negative = negative + 1;
        //     // this.state.negative = negative
        //     console.log(this.state.reversedBoard)
        //     console.log(this.state.negativeBoard)
        //     console.log(this.state.negative)
        // }
        // else {
            //console.log(copyReversedBoard)
            //*Asign the copied slot objects with new slots added
            //*to the board array at a specfied index
            this.state.reversedBoard[x].slot = copyReversedBoard
            //console.log(this.state.reversedBoard[x])
            this.setState({
                reversedBoard: this.state.reversedBoard
            })
       // }
        this.state.totalSlots = this.state.totalSlots - 1;
        //console.log(this.state.totalSlots)

        
    };

    addNeutralSlot(n){

        //*Log the index number
        //console.log(n)
        /*
         * copy the 'slot' object from the board at specified index
         */
        var copyNeutralBoard = [...this.state.neutralBoard[n].slot]
        //*then push another object to the copied slot object
        copyNeutralBoard.push({})
       // console.log(copyNeutralBoard)
        //*Asign the copied slot objects with new slots added
        //*to the board array at a specfied index
        this.state.neutralBoard[n].slot = copyNeutralBoard
        //console.log(this.state.neutralBoard)
        this.setState({
            neutralBoard: this.state.neutralBoard
        })
        
        this.state.totalSlots = this.state.totalSlots + 1;
        //console.log(this.state.totalSlots)
    };

    removeNeutralSlot(n) {
        
        //*Log the index number
        //console.log(x)
        /*
         * copy the 'slot' object from the board at specified index
         */
        var copyNeutralBoard = [...this.state.neutralBoard[n].slot]
        //*then remove last object from the copied slot object
        //copyNeutralBoard.splice(-1, 1)
        var length = copyNeutralBoard.length
        if (length < 2) {
            this.state.neutralBoard[n].slot = [{}];
            this.setState({
                neutralBoard: this.state.neutralBoard
            });
            // this.state.positiveBoard.shift(index, 1);
            // this.setState({
            //     positiveBoard: this.state.positiveBoard
            // });
        }
        else {
            copyNeutralBoard.splice(-1, 1)
            //console.log(copyNeutralBoard)
            //*Asign the copied slot objects with new slots added
            //*to the board array at a specfied index
            this.state.neutralBoard[n].slot = copyNeutralBoard
            //console.log(this.state.reversedBoard[x])
            this.setState({
                neutralBoard: this.state.neutralBoard
            })
        
            this.state.totalSlots = this.state.totalSlots - 1;
            //console.log(this.state.totalSlots)
        }
        if (this.state.neutralBoard.lenght < 0) {
            this.state.neutralBoard = []
        }
    };

    getTotal(){

        console.log(this.state.totalSlots)
        //* ---PASS TO LOCAL STORAGE---
        localStorage.setItem('TOTAL_CARDS', this.state.totalSlots);
    }

    createAnchorsList() {

        var currentId = localStorage.getItem('CURRENT_ID');
        var currentCode = localStorage.getItem('CURRENT_CODE');

        //*---POSITIVE ANCHORS---
        var positiveBoardCopy = this.state.positiveBoard;
        var i;
        for (i = 0; i < positiveBoardCopy.length; i++){
            var anchorNumber = positiveBoardCopy[i].positive;
            var numberOfSlots = positiveBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, surveyID: currentId };
            this.state.anchorsList.push(anchorsObject);
        };
        //*---NEGATIVE ANCHORS---
        var negativeBoardCopy = this.state.negativeBoard;
        var i;
        for (i = 0; i < negativeBoardCopy.length; i++){
            var anchorNumber = negativeBoardCopy[i].negative;
            var numberOfSlots = negativeBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, surveyID: currentId };
            this.state.anchorsList.push(anchorsObject);
        };
        //*---NEUTRAL ANCHORS---
        var neutralBoardCopy = this.state.neutralBoard;
        var i;
        for (i = 0; i < neutralBoardCopy.length; i++){
            var anchorNumber = neutralBoardCopy[i].neutral;
            var numberOfSlots = neutralBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, surveyID: currentId };
            this.state.anchorsList.push(anchorsObject);
        };
    };

    postNewBoard(e) {
        e.preventDefault();
        //console.log(this.state.positiveBoard[1].positive)
        this.createAnchorsList();
        console.log(this.state.anchorsList)

        const anchor = this.state.anchorsList
        var i;
        var newAnchor = {};
        var success = [];

        for (i = 0; i < anchor.length; i++){
            //console.log(i)
            newAnchor = anchor[i]
            createAnchor(newAnchor)
                .then(response => {
                    //console.log(response);
                    success.push(response.ok)
                })
                .catch(err => { console.log(err) })
        }
        var check = success.every( function (value, _, array) { return array[0] === value; });
        if (check === true) {
            this.getTotal();
            { this.setState({ Redirect: true }); }; 
        };      
    };

    reset = () => {
        var neutral = [{ neutral: 0, slot: [{}], }];
        var negative = [];
        var positive = [];
        var counter = 0;
        this.setState({
            neutralBoard: neutral,
            positiveBoard: positive,
            reversedBoard: negative,
            negativeBoard: negative,
            negative: counter,
            positive: counter,
            totalSlots: 1
        })
    };

    removeAnchor = () => {
        var total_slots = this.state.totalSlots;
        //REMOVE POSITIVE ANCHOR
        var positive_board = this.state.positiveBoard;

        var lastAnchor = positive_board[positive_board.length - 1];
        console.log(lastAnchor)
        var lastAnchorSlot = lastAnchor.slot;
        var slotSize = 0;
        for (var i = 0; i < lastAnchorSlot.length; i++){
            slotSize++
        };

        positive_board.splice(-1, 1);
        this.setState({
            positiveBoard: positive_board
        });

        //REMOVE NEGATIVE ANCHOR
        var negative_board = this.state.negativeBoard;
        var reversed_board = this.state.reversedBoard;
        var counter_negative = this.state.negative;

        var lastAnchorNegative = negative_board[negative_board.length - 1];
        var lastAnchorSlotNegative = lastAnchorNegative.slot;
        var slotSizeNegative = 0;
        for (var i = 0; i < lastAnchorSlotNegative.length; i++){
            slotSizeNegative++
        };

        negative_board.splice(-1, 1);
        reversed_board.splice(0, 1);
        counter_negative = counter_negative + 1;
        this.setState({
            negativeBoard: negative_board,
            reversedBoard: reversed_board,
            negative: counter_negative
        });

        //TOTAL SLOTS      
        var totalSlotSize = slotSize + slotSizeNegative;
        var newTotal = total_slots - totalSlotSize;
        this.setState({
            totalSlots: newTotal
        });

        
    };

    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/CreateSurvey_Step3_questions',
                }}/>
            )
        };
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container-white">
                         <h1 className="sub-heading-blue-2">
                            Design Q-Board
                        </h1>
                        <p className="sub-sub-heading-blue-2">Step 2 of 4</p>
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='survey-content-container-2'>
                    <div className='center'>
                        <h1 className='total-cards-text'>Total Slots</h1>
                    </div>
                    <div className='center'>
                        <p className='total-number-text'>{this.state.totalSlots}</p> 
                    </div>
                <div className='center'>                                        
                        <button 
                            className='add-anchor-btn'
                            onClick={(e) => this.addAnchor(e)}>
                            ADD ANCHOR + 
                        </button>
                         
                    </div>
                    <div className='row1'>
                        <button 
                            className='reset-btn'
                            onClick={this.reset}>
                            Reset Q-Board 
                        </button>
                    
                    
                        <button 
                            className='reset-btn'
                            onClick={this.removeAnchor}>
                            Remove last anchor 
                        </button>
                    </div>
                    

                <div className='center'>
                    {this.state.reversedBoard.map((item, x) => {
                        return (
                            <div key={x}>
                                
                                <div className='slot-index'>
                                    {item.negative}    
                                </div>
                                <div className='center'>
                                    <button
                                        className='add-slot-btn'
                                        onClick={()=>this.addNegativeSlot(x)}>
                                        +
                                    </button>
                                </div>
                                
                                <div>
                                    {item.slot.map((c, i) =>
                                        <div
                                            key={i}
                                            className='slot-container'>
                                            <input
                                            className='slot1 center'
                                            readOnly/>
                                        
                                        </div>
                                    )}
                                </div>

                                <div className='center'>
                                    <button
                                        className='remove-slot-btn'
                                        onClick={()=>this.removeNegativeSlot(x)}>
                                        -
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                        
                     {this.state.neutralBoard.map((item, n) => {
                            return(
                                <div>
                                    <div >
                                        <div className='slot-index'>
                                            {n}
                                        </div>
                                    </div>

                                    <div className='center'>
                                        <button
                                            className='add-slot-btn'
                                            onClick={()=> this.addNeutralSlot(n)}>
                                                +
                                        </button>
                                    </div>
                                   
                                    <div> 
                                        {item.slot.map((c, i)=>
                                            <div 
                                                key={i}
                                                className='slot-container'>
                                                <input 
                                                className='slot1 center'
                                                readOnly/>
                                            </div>
                                        )}
                                    </div>

                                    <div className='center'>
                                    <button
                                        className='remove-slot-btn'
                                        onClick={()=>this.removeNeutralSlot(n)}>
                                        -
                                    </button>
                                </div>

                                </div>
                            )
                        })}

                        {this.state.positiveBoard.map((item, index)=>{
                            return(
                                <div >
                                    
                                    <div className='center'>
                                        <div className='slot-index'>
                                            {index + 1}
                                        </div>
                                    </div>                                    
                                    
                                    <div className='center'>
                                        <button
                                            className='add-slot-btn'
                                            onClick={()=> this.addPositiveSlot(index)}>
                                                +
                                        </button>
                                    </div>
                                   
                                    <div> 
                                        {item.slot.map((c, i)=>
                                            <div 
                                                key={i}
                                                className='slot-container'>
                                                <input 
                                                className='slot1 center'
                                                readOnly/>
                                            </div>
                                        )}
                                    </div>

                                    <div className='center'>
                                    <button
                                        className='remove-slot-btn'
                                        onClick={()=>this.removePositiveSlot(index)}>
                                        -
                                    </button>
                                </div>
                                        
                                </div>
                            )
                        })}
                        
                    
                    </div>    
                    
                    <div className='center-btn-row'>    
                        <button
                            // onClick={this.postSurvey}
                            className="next-btn">
                            Save and Quit
                        </button> 
                        <button
                            onClick={this.postNewBoard}
                            className="next-btn">
                            Next
                        </button> 
                    </div>
                        
                </div>
                </div>
            
           
        )
    }
}