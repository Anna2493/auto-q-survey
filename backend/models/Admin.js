const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define( //relfect database fileds
  'admin',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  }
)