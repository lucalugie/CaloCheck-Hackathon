
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const Usershistory = sequelize.define("usershistorys",
{
    id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  userlineid: {
    type: DataTypes.STRING,
  },
  idfood: {
    type: DataTypes.INTEGER,
    allowNull: true
  },


});




module.exports = Usershistory;