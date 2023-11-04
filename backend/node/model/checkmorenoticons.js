const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Checkmorenoticons = sequelize.define("checkmorenoticons", {
    userid: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  lackofprotein: {
    type: DataTypes.TINYINT,
  },
  overprotein: {
    type: DataTypes.TINYINT,
  },
  lackofcal: {
    type: DataTypes.TINYINT,
  },
  overcal: {
    type: DataTypes.TINYINT,
  },
  lackfat: {
    type: DataTypes.TINYINT,
  },
  overfat: {
    type: DataTypes.TINYINT,
  },
  lacksalt: {
    type: DataTypes.TINYINT,
  },
  oversalt: {
    type: DataTypes.TINYINT,
  },
  lacksugar: {
    type: DataTypes.TINYINT,
  },
  oversugar: {
    type: DataTypes.TINYINT,
  },
  lackveg: {
    type: DataTypes.TINYINT,
  },
  overveg: {
    type: DataTypes.TINYINT,
  },
  lackcarb: {
    type: DataTypes.TINYINT,
  },
  overcarb: {
    type: DataTypes.TINYINT,
  }
},{
    updatedAt: false,
    createdAt: false,
  });

module.exports = Checkmorenoticons;
