/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
        otherKey: "role_id",
        as: "roles",
      });
    }

    // Método para garantir que a senha nunca seja retornada
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "username_unique",
          msg: "This username already exists",
        },
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [3, 30],
            msg: "Username must be between 3 and 30 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "users_email_unique",
          msg: "This email already exists",
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid email address",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password must be between 6 and 100 characters",
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name is required",
          },
        },
      },
      bio: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 500],
            msg: "Bio cannot exceed 500 characters",
          },
        },
      },
      avatarUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Avatar must be a valid URL",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ["password"], // Remove senha por padrão nas consultas
        },
      },
      scopes: {
        withPassword: {
          attributes: {}, // Inclui a senha quando necessário
        },
      },
      hooks: {
        beforeValidate: (user) => {
          // Validações extras apenas para criação de novos registros
          if (user.isNewRecord) {
            if (!user.username) {
              throw new Error("Username is required");
            }
            if (!user.email) {
              throw new Error("Email is required");
            }
            if (!user.password) {
              throw new Error("Password is required");
            }
            if (!user.firstName) {
              throw new Error("First name is required");
            }
            if (!user.lastName) {
              throw new Error("Last name is required");
            }
          }

          // Validações que se aplicam tanto para criação quanto atualização
          if (user.username && user.username.length < 3) {
            throw new Error("Username must be at least 3 characters");
          }
          if (user.password && user.password.length < 6) {
            throw new Error("Password must be at least 6 characters");
          }
        },
        beforeCreate: (user) => {
          // Garante que campos opcionais tenham valores padrão
          if (!user.bio) user.bio = null;
          if (!user.avatarUrl) user.avatarUrl = null;
        },
        beforeUpdate: (user) => {
          // Impede a atualização de alguns campos
          if (user.changed("id")) {
            throw new Error("ID cannot be changed");
          }
        },
      },
    },
  );

  return User;
};
