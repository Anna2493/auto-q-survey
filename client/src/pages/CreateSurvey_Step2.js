import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createAnchor, getSurveys } from '../BackendFunctions';

export default class CreateSurvey_Step2 extends React.Component {
    constructor() {
        super();
        this.state = {
            positiveBoard: [],
            neutralBoard: [
                {
                    neutral: 0,
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
        }

        this.postNewBoard = this.postNewBoard.bind(this);
        
    }

    componentDidMount() {
        this.getSurveyId();
    }

    getSurveyId() {

        //This part of the code was inspired by pilot application
        const requestSurveys = {
            adminID: localStorage.getItem('adminID')
        };
        getSurveys(requestSurveys)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                var listOfIds = data.map(({ survey_id }) => survey_id)
                this.setState({
                    surveyID : listOfIds.slice(-1)[0]
                })
                console.log(this.state.surveyID);
                localStorage.setItem('surveyID', this.state.surveyID);
            })
    };



    addAnchor(){
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
        //---NEGATIVE BOARD SETUP---
        this.state.negative = this.state.negative - 1;

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
        this.state.reversedBoard = [...this.state.negativeBoard].reverse()
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
    }

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
    }

    addNeutralSlot(n){

        //TODO fix adding slots to neutral board
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
    }

    getTotal(){

        console.log(this.state.totalSlots)
        //* ---PASS TO LOCAL STORAGE---
        localStorage.setItem('TOTAL_CARDS', this.state.totalSlots);
    }

    createAnchorsList() {
        //*---POSITIVE ANCHORS---
        var positiveBoardCopy = this.state.positiveBoard;
        var i;
        for (i = 0; i < positiveBoardCopy.length; i++){
            var anchorNumber = positiveBoardCopy[i].positive;
            var numberOfSlots = positiveBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, survey_id: this.state.surveyID };
            this.state.anchorsList.push(anchorsObject);
        };
        //*---NEGATIVE ANCHORS---
        var negativeBoardCopy = this.state.negativeBoard;
        var i;
        for (i = 0; i < negativeBoardCopy.length; i++){
            var anchorNumber = negativeBoardCopy[i].negative;
            var numberOfSlots = negativeBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, survey_id: this.state.surveyID };
            this.state.anchorsList.push(anchorsObject);
        };
        //*---NEUTRAL ANCHORS---
        var neutralBoardCopy = this.state.neutralBoard;
        var i;
        for (i = 0; i < neutralBoardCopy.length; i++){
            var anchorNumber = neutralBoardCopy[i].neutral;
            var numberOfSlots = neutralBoardCopy[i].slot.length;
            const anchorsObject = { anchor: anchorNumber, slots: numberOfSlots, survey_id: this.state.surveyID };
            this.state.anchorsList.push(anchorsObject);
        };
    }

    postNewBoard(e) {
        e.preventDefault();
        //console.log(this.state.positiveBoard[1].positive)
        this.createAnchorsList();
        //console.log(this.state.anchorsList)

        const anchor = this.state.anchorsList
        var i;
        var newAnchor = {};

        for (i = 0; i < anchor.length; i++){
            //console.log(newAnchor.anchor)
            newAnchor = anchor[i]
            createAnchor(newAnchor)
                .then(response => {
                    console.log(response);
                    if (response.ok == true) {
                        console.log("Anchors added")
                       // this.setState({ Redirect: true });
                    };
            });
        }
            
    }



    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/',
                }}/>
            )
        };
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container">
                        <h1 className="sub-heading">
                            Create Survey
                        </h1>
                        {/* <h2 className="sub-heading">
                            Step One
                        </h2> */}
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='center'>                                        
                        <button 
                            className='add_anchor-btn'
                            onClick={(e) => this.addAnchor(e)}>
                            ADD ANCHOR
                        </button>                    
                </div>

                
           
                <div className='survey-content-container'>
                    {this.state.reversedBoard.map((item, x) => {
                        return (
                            <div>
                                <div className='center'>
                                    <div className='slot-index'>
                                        {item.negative}    
                                    </div>
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
                                            key={i}>
                                            <input
                                            className='slot center'
                                            readOnly/>
                                        
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                     {this.state.neutralBoard.map((item, n) => {
                            return(
                                <div>
                                    <div className='center'>
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
                                            key={i}>
                                                <input 
                                                className='slot center'
                                                readOnly/>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )
                        })}

                        {this.state.positiveBoard.map((item, index)=>{
                            return(
                                <div>
                                    
                                    <div className='center'>
                                        <div className='slot-index'>
                                            {item.positive}
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
                                            key={i}>
                                                <input 
                                                className='slot center'
                                                readOnly/>
                                            </div>
                                        )}
                                    </div>
                                        
                                </div>
                            )
                        })}
                        
                    </div>
                        
                        <div>
                            <button
                                onClick={this.postNewBoard}
                                className="register-btn">
                                    Next
                            </button>
                        </div>
        
                </div>
            
           
        )
    }
}