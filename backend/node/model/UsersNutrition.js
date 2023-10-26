const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UsersNutrition = sequelize.define("usersnutritions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  goals: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  achieve: {
    type: DataTypes.DOUBLE,
  },
  left: {
    type: DataTypes.DOUBLE,
  },
  exceed: {
    type: DataTypes.DOUBLE,
  },
  goals_protein: {
    type: DataTypes.DOUBLE,
  },
  goals_fat: {
    type: DataTypes.DOUBLE,
  },
  goals_salt: {
    type: DataTypes.DOUBLE,
  },
  goals_sugar: {
    type: DataTypes.DOUBLE,
  },
  goals_veg: {
    type: DataTypes.DOUBLE,
  },
  goals_carb: {
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
  ach_cal: {
    type: DataTypes.INTEGER
  }
 
});

module.exports = UsersNutrition;
