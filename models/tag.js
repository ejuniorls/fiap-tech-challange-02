/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // define association here
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "tag_name_unique",
          msg: "tag name already exists",
        },
        validate: {
          notEmpty: {
            msg: "tag name is required",
          },
          len: {
            args: [3, 30],
            msg: "tag name must be between 3 and 30 characters",
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
            msg: "tag description cannot exceed 500 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
      underscored: true,
      paranoid: true,
    },
  );
  return Tag;
};
