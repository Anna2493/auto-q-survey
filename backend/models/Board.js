const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'board',
  {
    board_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    survey_id: {
      type: Sequelize.INTEGER,
    },
    admin_id: {
      type: Sequelize.INTEGER
    },
    negative_anchor: {
      type: Sequelize.STRING
    },
    positive_anchor: {
      type: Sequelize.STRING
    },
    neutral_anchor: {
      type: Sequelize.STRING
      },
    slots: {
      type: Sequelize.STRING
      },
    total_slots: {
      type: Sequelize.STRING
      },
   
  },
  {
    timestamps: false
  }
)