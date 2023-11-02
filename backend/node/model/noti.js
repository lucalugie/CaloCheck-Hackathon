
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const noti = sequelize.define("noti",
{
    userid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Breakfasteat: {
    type: DataTypes.TINYINT,
  },
  Luncheat: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  dinnereat: {
    type: DataTypes.TINYINT,
    allowNull: true
  },

});




module.exports = noti;