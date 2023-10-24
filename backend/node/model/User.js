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
  }

},
{
  updatedAt: false
});

module.exports = Users;