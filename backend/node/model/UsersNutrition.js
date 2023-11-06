const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UsersNutrition = sequelize.define("usersnutritions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userlineid: {
    type: DataTypes.STRING,
  },
  ach_kcal: {
    type: DataTypes.DOUBLE,
  },
  ach_g: {
      type: DataTypes.DOUBLE,
    },
  ach_protein: {
    type: DataTypes.DOUBLE,
  },
  ach_fat: {
    type: DataTypes.DOUBLE,
  },
  ach_salt: {
    type: DataTypes.DOUBLE,
  },
  ach_sugar: {
    type: DataTypes.DOUBLE,
  },
  ach_veg: {
    type: DataTypes.DOUBLE,
  },
  ach_carb: {
    type: DataTypes.DOUBLE,
  },
});

module.exports = UsersNutrition;
