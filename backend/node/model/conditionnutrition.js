const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const noticons = sequelize.define("noticons", {
  userlineid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  cal: {
    type: DataTypes.INTEGER,
  },
  protein: {
    type: DataTypes.DOUBLE,
  },
  fat: {
    type: DataTypes.DOUBLE,
  },
  salt: {
    type: DataTypes.DOUBLE,
  },
  sugar: {
    type: DataTypes.DOUBLE,
  },
  veg: {
    type: DataTypes.DOUBLE,
  },
  carb: {
    type: DataTypes.DOUBLE,
  }
},{
    updatedAt: false
  });

module.exports = noticons;
