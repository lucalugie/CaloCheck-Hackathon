
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const noti = sequelize.define("notis",
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
  dinnerEat: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  morecal: {
    type: DataTypes.TINYINT,
  }


},{
    updatedAt: false
});




module.exports = noti;