const express = require("express")
const anchors = express.Router()
const cors = require('cors')


const Anchor = require("../models/Anchor")
anchors.use(cors())

anchors.post('/api/anchor', (req, res) => {
    
    const anchorData = {
        anchor: req.body.anchor,
        slots: req.body.slots,
        survey_id: req.body.surveyID,
    }
    Anchor.create(anchorData)
        .then(anchor => {
            res.json(anchor)
        })
        .catch(err => {
            res.send('error ' + err)
        })
})   
    
module.exports = anchors