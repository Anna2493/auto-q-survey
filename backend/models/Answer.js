const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'answer',
  {
    answer_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_number: {
      type: Sequelize.STRING
    },
    question: {
      type: Sequelize.STRING
    },
    answer: {
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