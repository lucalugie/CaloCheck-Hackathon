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
  pictureUrl: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  gender:{
    type: DataTypes.STRING,
    allowNull:true
  },
  weight:{
    type: DataTypes.STRING,
    allowNull:true
  },
  height:{
    type: DataTypes.STRING,
    allowNull:true
  },
  cal:{
    type: DataTypes.INTEGER,
    allowNull:true
  },
  bmi:{
    type: DataTypes.STRING,
    allowNull:true
  }

},
{
  updatedAt: false
});

module.exports = Users;