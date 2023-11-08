
const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/database");

const photoAi = sequelize.define("photos",
{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userlineid: {
    type: DataTypes.STRING,
  },
  namefood: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.TEXT,

  },


});




module.exports = photoAi;