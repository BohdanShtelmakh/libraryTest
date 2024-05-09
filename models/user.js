const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');
const authUtil = require('../util/authUtil');

class User extends Model {

  async generateToken(user, password) {
    const isMatch = user.checkPassword(password);
    if (isMatch) {
      const token = await authUtil.jwtSign({ id: user.id });
      return token;
    } else {
      return false;
    }
  }

  async checkToken(token) {
    const decoded = await authUtil.jwtCheck(token);
    return decoded;
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
      instanceMethods: {
        checkPassword: async function (password) {
          const isMatch = await authUtil.passwordCompare(password, this.password);
          return isMatch;
        }
      },
      // classMethods: {

      // }
    }
  );
}

module.exports = { User, initUserModel }