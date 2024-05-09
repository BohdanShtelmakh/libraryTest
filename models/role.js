const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const { User } = require('./user');

class Role extends Model { }

async function initRoleModel() {
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  );

  Role.hasMany(User, {
    onDelete: 'CASCADE',
    foreignKey: 'role_id',
  })
}

module.exports = { Role, initRoleModel }