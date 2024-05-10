const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Book extends Model { }

function initBookModel() {
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books', 
    }
  );
}

module.exports = { Book, initBookModel }