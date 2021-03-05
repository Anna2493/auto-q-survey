const express = require("express")
const answers = express.Router()
const cors = require('cors')

const Answer = require("../models/Answer")
answers.use(cors())

answers.post('/api/answer', (req, res) => {
    
    const answerData = {
        question_number: req.body.questionNumber,
        question: req.body.question,
        answer: req.body.answer,
        survey_id: req.body.surveyID,
    }
    Answer.create(answerData)
        .then(answer => {
            res.json(answer)
        })
        .catch(err => {
            res.send('error ' + err)
        })
});

module.exports = answers