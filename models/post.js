/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [0, 500],
          msg: "excerpt cannot exceed 500 characters",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'), // Valores definidos aqui
      allowNull: false,
      defaultValue: 'draft' // Valor padrão adicionado
    },
    published_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts",
    underscored: true,
    paranoid: true,
  });
  return Post;
};