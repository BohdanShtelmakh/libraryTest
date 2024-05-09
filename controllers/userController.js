const { User } = require('../models/user');

class UserController {
  async register(req, res) {
    const { username, password } = req.body;
    const user = await User.create({ username, password, role_id: 2 });

    res.status(200).json({
      success: true,
      user
    });
  }

  async login(req, res) {
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
  }

  async create(req, res) {
    const { username, password, role_id } = req.body;
    const user = await User.create({ username, password, role_id });
    res.status(200).json({
      success: true,
      user
    })
  }

  async update(req, res) {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    const user = await User.update({ username, password, role_id }, { where: { id } });
    res.status(200).json({
      success: true,
      user
    })
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    res.status(200).json({
      success: true,
      user
    })
  }

  async getAll(req, res) {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      users
    })
  }

  async getById(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    res.status(200).json({
      success: true,
      user
    })
  }
}

module.exports = new UserController();