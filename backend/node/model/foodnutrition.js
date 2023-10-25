const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const foodnutrition = sequelize.define("foodnutritions", 
{
    idfood: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  }

},
{
  updatedAt: false
});

module.exports = foodnutrition;