const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'question',
  {
    question_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
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