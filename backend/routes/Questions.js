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
});

//GET QUESTIONS
questions.post('/api/getQuestions', (req, res) => {
    Question.findAll({
        where: {
            survey_id: req.body.surveyID
        }
    })
        .then(question => {
            res.json(question); 
        })
        .catch(err => {
        res.status(400).json({ error: err })
    })
})
    
module.exports = questions