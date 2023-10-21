const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const Users = sequelize.define("users", 
{
    userlineId: {
    type: DataTypes.STRING,
  },
  displayName: {
    type: DataTypes.STRING,
  }
  
});

module.exports = Users;