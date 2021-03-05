const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'result',
  {
    result_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    anchor_number: {
      type: Sequelize.INTEGER,
    },
    statement: {
      type: Sequelize.STRING
    },
    statement_number: {
      type: Sequelize.INTEGER,
    },
    survey_id: {
      type: Sequelize.INTEGER,
    },
   
  },
  {
    timestamps: false
  }
)