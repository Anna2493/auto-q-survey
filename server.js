const express = require('express')
const cors = require('cors') //Dont use cors on production
const bodyParser = require('body-parser') //Handles JSON. Extracts
// the data send from client side 
const app = express() //instantiate express
const port =  process.env.PORT || 5000 //3000

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const Admins = require('./backend/routes/Admins')
app.use('/', Admins)

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




