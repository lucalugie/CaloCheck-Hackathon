const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Users = sequelize.define(
  "users",
  {
    userlineId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pictureUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    bmi: {
      type: DataTypes.INTEGER,
    },
    cal: {
      type: DataTypes.INTEGER,
    },
    age: {
       type: DataTypes.INTEGER,
    }
  },
  {
    updatedAt: false,
  }
);

module.exports = Users;
