const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('auto_q_survey_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql', //type of database that is going to be used
  operatorsAliases: false, //used to create complex comparision

  pool: { //connection part with sequilize
    max: 5, //maximum number of connections
    min: 0, //minimum number of connections
    acquire: 30000, //miliseconds time of making connection before making an error
    idle: 10000 //milkisecond time for how long the connection can be idle
  }
})

// const sequelize = new Sequelize('heroku_dc0786e4b1681e5', 'bc04907ee2af0b', '130f69b5', {
//   host: 'eu-cdbr-west-03.cleardb.net',
//   dialect: 'mysql', //type of database that is going to be used
//   operatorsAliases: false, //used to create complex comparision

//   pool: { //connection part with sequilize
//     max: 5, //maximum number of connections
//     min: 0, //minimum number of connections
//     acquire: 30000, //miliseconds time of making connection before making an error
//     idle: 10000 //milkisecond time for how long the connection can be idle
//   }
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db