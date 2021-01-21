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
    admin_id: {
      type: Sequelize.INTEGER
    },
    survey_id: {
      type: Sequelize.INTEGER,
    },
    anchor: {
      type: Sequelize.INTEGER
    },
    slots: {
      type: Sequelize.INTEGER
      },
    total_slots: {
      type: Sequelize.INTEGER
      },
   
  },
  {
    timestamps: false
  }
)