const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'statement',
  {
    statement_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    statement: {
      type: Sequelize.STRING
    },
    survey_id: {
      type: Sequelize.INTEGER,
    },
   
  },
  {
    timestamps: false
  }
)