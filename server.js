var express = require('express')
var cors = require('cors') //Dont use cors on production
var bodyParser = require('body-parser') //Handles JSON. Extracts
// the data send from client side 
var app = express() //instantiate express
var port = process.env.PORT || 5000 //3000

// const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://auto-q-survey-web.herokuapp.com/']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions))

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var Admins = require('./backend/routes/Admins')
app.use('/', Admins)

// app.get('/', (req, res) => {
//   res.send("hello")
// })
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
// // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})



// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// app.use(cors());
// app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// const port = process.env.PORT || 5000

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'auto_q_survey_db'
// })



// app.post("/api/register", (req, res) => {

//   const item1 = req.body.item1;
//   const item2 = req.body.item2;

//   const sqlInsert = "INSERT INTO test (item1,item2) VALUES (?,?)"
//   db.query(sqlInsert, [item1, item2], (err, result) => {
//     console.log(result)
//   })
// });

// app.listen(port, function() {
//   console.log('Server is running on port: ' + port)
// })




