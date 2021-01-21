const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'anchor',
  {
    anchor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    anchor: {
      type: Sequelize.INTEGER
    },
    slots: {
      type: Sequelize.INTEGER
      },
    survey_id: {
      type: Sequelize.INTEGER,
    },
   
  },
  {
    timestamps: false
  }
)