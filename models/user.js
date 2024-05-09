const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');
const authUtil = require('../util/authUtil');

class User extends Model {

  async generateToken(user, password) {
    const isMatch = await user.checkPassword(password);
    if (isMatch) {
      const token = await authUtil.jwtSign({ id: user.id, role_id: user.role_id });
      return token;
    } else {
      return false;
    }
  }

  async checkToken(token) {
    const decoded = await authUtil.jwtCheck(token);
    return decoded;
  }

  async checkPassword(password) {
    const isMatch = await authUtil.passwordCompare(password, this.password);
    return isMatch;
  }
}

function initUserModel() {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        async validatePassword(password) {
          const isValid = await authUtil.passwordValidate(password);
          if (isValid !== true) {
            throw new Error(isValid);
          }
          return true;
        }
      }
    },
  },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeSave: async (user, options) => {
          return bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
          })
        },
      },
    }
  );
}

module.exports = { User, initUserModel }