const express = require("express")
const anchors = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt")

const Anchor = require("../models/Anchor")
anchors.use(cors())

//process.env.SECRET_KEY = 'secret'

//REGISTER
anchors.post('/api/anchor', (req, res) => {
    
    const anchorData = {
        anchor: req.body.anchor,
        slots: req.body.slots,
        survey_id: req.body.surveyID,
    }

    //console.log(surveyData)

    // Anchor.findOne({
    //     where: {
    //         survey_id: req.body.surveyID
    //     }
    // })
    .then(anchor => {
        if(!anchor) {
           // bcrypt.hash(req.body.password, 10, (err, hash) => {
             //   adminData.password = hash
                
                Anchor.create(anchorData)
                .then(anchor => {
                    res.json('anchors added to database')
                })
                .catch(err => {
                    res.send('error ' + err)
                })
           // })
        }
        else{
            res.json({error: "Survey with this name already exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})
//LOGIN
// admins.post('/api/login', (req, res) => {
//     Admin.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//         .then(admin => {
//             if (admin) {
//                 if (bcrypt.compareSync(req.body.password, admin.password)) {
//                     let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                        
//                     });
//                     //res.send({ token : token })
//                     //console.log(token)
//                     res.json({ token: token });
//                     //localStorage.setItem('adminToken', token)
//             }
//             }
//             else {
//                 res.status(400).json({error: 'Admin do not exist'})
//             }
//         })
//         .catch(err => {
//         res.status(400).json({ error: err })
//     })
// })

module.exports = anchors