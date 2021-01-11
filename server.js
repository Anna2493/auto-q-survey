var express = require('express')
var cors = require('cors') //Dont use cors on production
var bodyParser = require('body-parser') //Handles JSON. Extracts
// the data send from client side 
var app = express() //instantiate express
var port =  process.env.PORT || 5000 //3000

app.use(bodyParser.json()) //app.use mounts middleware to the application
//bodyparser.json() extract json to http request
app.use(cors()) //mounts cors to the application

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
var Admins = require('./backend/routes/Admins')
app.use('/admins', Admins)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

//,"proxy": "http://localhost:5000"