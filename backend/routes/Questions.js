const express = require("express")
const questions = express.Router()
const cors = require('cors')


const Question = require("../models/Question")
questions.use(cors())

questions.post('/api/question', (req, res) => {
    
    const questionData = {
        question: req.body.question,
        survey_id: req.body.surveyID,
    }
    Question.create(questionData)
        .then(question => {
            res.json(question)
        })
        .catch(err => {
            res.send('error ' + err)
        })
})   
    
module.exports = questions