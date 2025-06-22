/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "category_name_unique",
          msg: "category name already exists",
        },
        validate: {
          notEmpty: {
            msg: "category name is required",
          },
          len: {
            args: [3, 30],
            msg: "category name must be between 3 and 30 characters",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 500],
            msg: "category description cannot exceed 500 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      underscored: true,
      paranoid: true,
    },
  );
  return Category;
};
