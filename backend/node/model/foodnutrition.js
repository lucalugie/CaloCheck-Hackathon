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
  sku: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  per_items: {
    type: DataTypes.INTEGER
  },
  cal: {
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