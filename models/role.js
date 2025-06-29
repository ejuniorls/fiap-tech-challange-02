/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "role_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "name_unique",
          msg: "This name already exists",
        },
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          len: {
            args: [3, 30],
            msg: "Name must be between 3 and 30 characters",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 500],
            msg: "Description cannot exceed 500 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      underscored: true,
      paranoid: true,
    },
  );
  return Role;
};
