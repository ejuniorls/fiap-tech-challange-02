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
    excerpt: DataTypes.TEXT,
    content: DataTypes.TEXT,
    status: DataTypes.ENUM,
    publishedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts",
    underscored: true,
    paranoid: true,
  });
  return Post;
};