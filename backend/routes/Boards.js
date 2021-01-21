const express = require("express")
const boards = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt")

const Board = require("../models/Board")
boards.use(cors())

//process.env.SECRET_KEY = 'secret'

//REGISTER
boards.post('/api/board', (req, res) => {
    
    const boardData = {
        survey_id: req.body.surveyID,
        admin_id: req.body.adminID,
        anchor: req.body.anchor,
        slots: req.body.slots,
        total_slots: req.body.totalSlots,
    }

    //console.log(surveyData)

    Board.findOne({
        where: {
            survey_id: req.body.surveyID
        }
    })
    .then(board => {
        if(!board) {
           // bcrypt.hash(req.body.password, 10, (err, hash) => {
             //   adminData.password = hash
                
                Board.create(boardData)
                .then(board => {
                    res.json('board added to database')
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

module.exports = boards