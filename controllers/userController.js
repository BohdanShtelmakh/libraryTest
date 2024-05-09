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
      const token = user.generateToken(user);
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
}

module.exports = new UserController();