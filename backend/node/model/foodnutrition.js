const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');

const Foodnutrition = sequelize.define('foodnutritions', {
  idfood: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  //lugie modify****  very important****
  },
  sku: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  per_items: {
    type: DataTypes.INTEGER
  },
  kcal: {
    type: DataTypes.DOUBLE
  },
  carb: {
    type: DataTypes.STRING
  },
  per_carb: {
    type: DataTypes.DOUBLE
  },
  per_fat: {
    type: DataTypes.DOUBLE
  },
  protein: {
    type: DataTypes.STRING
  },
  per_protein: {
    type: DataTypes.DOUBLE
  },
  veg: {
    type: DataTypes.STRING
  },
  per_veg: {
    type: DataTypes.DOUBLE
  },
  per_sugar: {
    type: DataTypes.DOUBLE
  },
  per_salt: {
    type: DataTypes.DOUBLE
  }
 
});

module.exports = Foodnutrition;