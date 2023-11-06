const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UsersGoals = sequelize.define("usersGoals", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userlineid: {
    type: DataTypes.STRING,
    unique: true,
  },
  goals_kcal: {
    type: DataTypes.INTEGER,
  },
  goals_g: {
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
});

module.exports = UsersGoals;
