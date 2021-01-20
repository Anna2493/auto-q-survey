const express = require("express")
const surveys = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt")

const Survey = require("../models/Survey")
surveys.use(cors())

//process.env.SECRET_KEY = 'secret'

//REGISTER
surveys.post('/api/survey', (req, res) => {
    
    const surveyData = {
        admin_id: req.body.adminID,
        survey_name: req.body.surveyName,
        survey_description: req.body.surveyDescription,
        category1: req.body.category1,
        category2: req.body.category2,
        category3: req.body.category3,
        privacy_statement: req.body.privacyStatement,
        survey_code: req.body.surveyCode,
        
    }

    Survey.findOne({
        where: {
            survey_name: req.body.surveyName
        }
    })
    .then(survey => {
        if(!survey) {
           // bcrypt.hash(req.body.password, 10, (err, hash) => {
             //   adminData.password = hash
                
                Survey.create(surveyData)
                .then(survey => {
                    res.json({status: survey.survey_name + ' added to database'})
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

module.exports = surveys