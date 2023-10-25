
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const Usershistory = sequelize.define("usershistorys",
{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  userlineid: {
    type: DataTypes.STRING,
  },
  idfood: {
    type: DataTypes.INTEGER,
  },


},
{
  updatedAt: false
});




module.exports = Usershistory;