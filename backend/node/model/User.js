const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const Users = sequelize.define("users", 
{
    userlineId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull:true
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull:true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull:true
  },
  updatedAt: {
    type: DataTypes.DATE,
    timestamps:false,
    allowNull:true
  }

  
});

module.exports = Users;