const express = require("express")
const admins = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Admin = require("../models/Admin")
admins.use(cors())

process.env.SECRET_KEY = 'secret'

//REGISTER
admins.post('/api/register', (req, res) => {
    
    const adminData = {
        first_name: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        
    }

    Admin.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(admin => {
        if(!admin) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                adminData.password = hash
                
                Admin.create(adminData)
                .then(admin => {
                    res.json({status: admin.email + ' registered'})
                })
                .catch(err => {
                    res.send('error ' + err)
                })
            })
        }
        else{
            res.json({error: "User already exists"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})
//LOGIN
admins.post('/api/login', (req, res) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(admin => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
                        
                    });
                    //res.send({ token : token })
                    //console.log(token)
                    res.json({ token: token });
                    //localStorage.setItem('adminToken', token)
            }
            }
            else {
                res.status(400).json({error: 'Admin do not exist'})
            }
        })
        .catch(err => {
        res.status(400).json({ error: err })
    })
})

module.exports = admins