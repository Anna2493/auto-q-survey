const express = require("express")
const results = express.Router()
const cors = require('cors')


const Result = require("../models/Result")
results.use(cors())

results.post('/api/result', (req, res) => {
    
    const resultData = {
        anchor_number: req.body.anchorNumber,
        statement: req.body.statement,
        statement_number: req.body.statementNumber,
        survey_id: req.body.surveyID,
    }
    Result.create(resultData)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.send('error ' + err)
        })
});

module.exports = results