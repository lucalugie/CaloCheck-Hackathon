// const { DataTypes } = require("sequelize");
// const {sequelize} = require("../config/database");

// const foodnutrition = sequelize.define("foodnutritions", 
// {
//     idfood: {
//     type: DataTypes.INTEGER,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING,
//   }

// },
// {
//   updatedAt: false
// });

// module.exports = foodnutrition;

const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/database');

const Foodnutrition = sequelize.define('foodnutritions', {
  idfood: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  per_items: {
    type: DataTypes.INTEGER
  },
  cal: {
    type: DataTypes.INTEGER
  },
  carb: {
    type: DataTypes.STRING
  },
  per_carb: {
    type: DataTypes.INTEGER
  },
  fat: {
    type: DataTypes.STRING
  },
  per_fat: {
    type: DataTypes.INTEGER
  },
  protein: {
    type: DataTypes.STRING
  },
  per_protein: {
    type: DataTypes.INTEGER
  },
  veg: {
    type: DataTypes.STRING
  },
  per_veg: {
    type: DataTypes.INTEGER
  },
  sugar: {
    type: DataTypes.STRING
  },
  per_sugar: {
    type: DataTypes.INTEGER
  },
  salt: {
    type: DataTypes.STRING
  },
  per_salt: {
    type: DataTypes.INTEGER
  }
 
});

module.exports = Foodnutrition;