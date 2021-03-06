import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { createStatement } from '../BackendFunctions';

export default class UploadStatements extends React.Component {
    constructor() {
        super();
        this.state = {
            totalCards: '',
            surveyID: '',
            statementCards: [],
            card: [{}],
            statements: [],
            
        }

    }

    componentDidMount() { 
        this.generateStatementCards();
    }

    generateStatementCards() {
        this.setState({ totalCards: localStorage.getItem('TOTAL_CARDS') })
        var i;
        var total = localStorage.getItem('TOTAL_CARDS')
        
        for (i = 0; i < total; i++){
            console.log(i)
            this.state.statementCards.push({});
        }
        console.log(this.state.statementCards)

        this.getStatementsFromLS();
    }

    getStatementsFromLS() {
        var rawStatements;
        rawStatements = localStorage.getItem('STATEMENTS');
        rawStatements = rawStatements.split(",");

        var statementsArray = [];
        for(var i = 0; i < rawStatements.length; i++) {
            var data = rawStatements[i].split(',');
            this.state.statements.push({ statement: data.toString(), surveyID: localStorage.getItem('CURRENT_ID') });
        };
        
        //this.setState({ statements: statementsArray });
    }

    next = (e) => {
        e.preventDefault();

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
            { this.setState({ Redirect: true }); }; 
            console.log("statements successfully added to the database");
        }
        
    }


    render() {
         if (this.state.Redirect) {
            return (
                <Redirect to={{
                pathname: '/CreateSurvey_Step4',
                }}/>
            )
        };
        return (
            <div>
                <div className='grid-container'>
                    <div className="item1 sub-header-container-white">
                         <h1 className="sub-heading-blue-2">
                            Upload Statements
                        </h1>
                        <p className="sub-sub-heading-blue-2">Step 3 of 4</p>
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
                            {this.state.statements.map((item, key) => {
                                return (
                                    <div key={key} className='space'>
                                        <textarea
                                            className='card'
                                            key={key}
                                            defaultValue={item.statement} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='center-btn-row'>    
                        <button
                            // onClick={this.postSurvey}
                            className="next2-btn">
                            Save and Quit
                        </button> 
                        <button
                            onClick={(e) => this.next(e)}
                            className="next2-btn">
                            Next
                        </button> 
                    </div>
                </div>
                

            </div>
        )
    }
}