/* eslint-disable no-unused-vars */
"use strict";
const { Model, Op  } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      // define association here
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.STRING(512),
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      isRevoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      underscored: true,
      paranoid: true,
      scopes: {
        valid: {
          where: {
            isRevoked: false,
            expiresAt: { [Op.gt]: sequelize.literal('CURRENT_TIMESTAMP') }
          }
        }
      }
    },
  );
  return RefreshToken;
};
