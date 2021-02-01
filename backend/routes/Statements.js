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
    
module.exports = statements