import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

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
        this.setState({ surveyID: localStorage.getItem('SURVEY_ID') });
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
            statementsArray.push({ statement: data.toString(), surveyID: this.state.surveyID });
        };
        
        this.setState({ statements: statementsArray });
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

                    {/* <button onClick={this.generateStatementCards}>
                        test
                    </button> */}
                </div>
                

            </div>
        )
    }
}