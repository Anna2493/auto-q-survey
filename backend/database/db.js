const Sequelize = require('sequelize')
const db = {}
// const sequelize = new Sequelize('auto_q_survey_db', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql', //type of database that is going to be used
//   operatorsAliases: false, //used to create complex comparision

//   pool: { //connection part with sequilize
//     max: 5, //maximum number of connections
//     min: 0, //minimum number of connections
//     acquire: 30000, //miliseconds time of making connection before making an error
//     idle: 10000 //milkisecond time for how long the connection can be idle
//   }
// })

const sequelize = new Sequelize('heroku_dede944307935c0', 'b3d459f9c76d32', '6494ac05', {
  host: 'eu-cdbr-west-03.cleardb.net',
  dialect: 'mysql', //type of database that is going to be used
  operatorsAliases: false, //used to create complex comparision

  pool: { //connection part with sequilize
    max: 5, //maximum number of connections
    min: 0, //minimum number of connections
    acquire: 30000, //miliseconds time of making connection before making an error
    idle: 10000 //milkisecond time for how long the connection can be idle
  }
})



db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db