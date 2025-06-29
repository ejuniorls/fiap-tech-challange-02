/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Associação com Role
      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }

  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "role_id"],
        },
      ],
    },
  );

  return UserRole;
};
