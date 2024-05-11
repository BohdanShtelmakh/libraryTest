const { User } = require('../models/user');

class UserController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password, role_id: 2 });

      res.status(200).json({
        success: true,
        user
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (user) {
        const token = await user.generateToken(user, password);
        if (token) {
          res.status(200).json({
            success: true,
            token,
            user
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid credentials'
          })
        }
      } else {
        res.status(401).json({
          success: false,
          message: 'No such user'
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const { username, password, role_id } = req.body;
      const user = await User.create({ username, password, role_id });
      res.status(200).json({
        success: true,
        user
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { username, password, role_id } = req.body;
      const user = await User.update({ username, password, role_id }, { where: { id } });
      res.status(200).json({
        success: true,
        user
      })
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        user
      })
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        success: true,
        users
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        user
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();