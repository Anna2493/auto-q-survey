import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createStatement } from '../BackendFunctions';

export default class ManuallStatements extends React.Component {
    constructor() {
        super();
        this.state = {
            totalCards: '',
            surveyID: '',
            statementCards: [],
            card: [{}],
            statements: []
        }

    }

    componentDidMount() {
        this.generateStatementCards();
        this.setState({ surveyID: localStorage.getItem('SURVEY_ID') });
    };

    generateStatementCards() {
        this.setState({ totalCards: localStorage.getItem('TOTAL_CARDS') })
        var i;
        var total = localStorage.getItem('TOTAL_CARDS')
        
        for (i = 0; i < total; i++){
            console.log(i)
            this.state.statementCards.push({statement : ''});
        }
        //console.log(this.state.statementCards)
    };

    handleChange = (event, index) => {
        this.state.statementCards[index] = event.target.value
        this.setState({ statementCards : this.state.statementCards})
    };

    getStatements = () => {

        var rawStatements = this.state.statementCards;
        rawStatements = rawStatements.toString().split(",");
        var statementsArray = [];
        for (var i = 0; i < rawStatements.length; i++){
            var data = rawStatements[i].split(',');
            this.state.statements.push({ statement: data.toString(), surveyID: this.state.surveyID });
        }
        //console.log(statementsArray)
        //this.setState({ statements: statementsArray });
        
    }

    next = (e) => {
        e.preventDefault();

        this.getStatements();
       console.log(this.state.statements)
        const statement = this.state.statements;
        //console.log(statement)
        var newStatement = {};
        var success = [];
        for (var i = 0; i < statement.length; i++){
            newStatement = statement[i];
            createStatement(newStatement)
                .then(response => {
                    success.push(response.ok)
                })
                .catch(err => { console.log(err) })
        }
        var check = success.every( function (value, _, array) { return array[0] === value; });
        if (check === true) {
            //this.getTotal();
            //{ this.setState({ Redirect: true }); }; 
            console.log("statements successfully added to the database");
        }
    };




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
                    </div>
                    <div className=' item6 navbar-container'>
                    <Navbar/>
                    </div>
                </div>

                <div className='column-center'>
                    <div className='total-text-container'>
                        <h1 className='total-cards-text'>Total cards</h1>
                        <h1 className='total-number-text'>{this.state.totalCards}</h1>
                    </div>

                    <div className='center cards-container'>
                        
                            <div>
                                {this.state.statementCards.map((item, index) => {
                                    return (
                                        <div key={index} className='space'>
                                            <textarea
                                                className='card'       
                                                value={item.statement}
                                                onChange={(e)=>this.handleChange(e, index)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            
                        
                    </div>

                    <button onClick={(e)=>this.next(e)}>
                        Next
                    </button>
                </div>
                

            </div>
        )
    }
}