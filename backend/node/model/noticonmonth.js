const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const noticonmonths = sequelize.define("noticonmonths", {
  userlineid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nameMon0thandyear: {
    type: DataTypes.STRING,
  },
  lackofprotein: {
    type: DataTypes.INTEGER,
  },
  overprotein: {
    type: DataTypes.INTEGER,
  },
  lackofcal: {
    type: DataTypes.INTEGER,
  },
  overcal: {
    type: DataTypes.INTEGER,
  },
  lackfat: {
    type: DataTypes.INTEGER,
  },
  overfat: {
    type: DataTypes.INTEGER,
  },
  lacksalt: {
    type: DataTypes.INTEGER,
  },
  oversalt: {
    type: DataTypes.INTEGER,
  },
  lacksugar: {
    type: DataTypes.INTEGER,
  },
  oversugar: {
    type: DataTypes.INTEGER,
  },
  lackveg: {
    type: DataTypes.INTEGER,
  },
  overveg: {
    type: DataTypes.INTEGER,
  },
  lackcarb: {
    type: DataTypes.INTEGER,
  },
  overcarb: {
    type: DataTypes.INTEGER,
  }
},{
    updatedAt: false,
    createdAt: false
  });

module.exports = noticonmonths;
