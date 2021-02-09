const express = require("express")
const statements = express.Router()
const cors = require('cors')


const Statement = require("../models/Statement")
statements.use(cors())

statements.post('/api/statement', (req, res) => {
    
    const statementData = {
        statement: req.body.statement,
        survey_id: req.body.surveyID,
    }
    Statement.create(statementData)
        .then(statement => {
            res.json(statement)
        })
        .catch(err => {
            res.send('error ' + err)
        })
})

//GET STATEMENTS
surveys.post('/api/getStatements', (req, res) => {
    Survey.findOne({
        where: {
            survey_id: req.body.surveyID
        }
    })
        .then(surveys => {
            res.json(surveys); 
        })
        .catch(err => {
        res.status(400).json({ error: err })
    })
})
    
module.exports = statements