const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'survey',
  {
    survey_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin_id: {
      type: Sequelize.INTEGER
    },
    survey_name: {
      type: Sequelize.STRING
    },
    survey_description: {
      type: Sequelize.STRING
    },
    category1: {
      type: Sequelize.STRING
      },
    category2: {
      type: Sequelize.STRING
      },
    category3: {
      type: Sequelize.STRING
      },
    privacy_statement: {
      type: Sequelize.STRING
      },
    survey_code: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)