const { Role } = require('../models/role');

class RoleController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const role = await Role.create({ name });
      res.status(200).json({
        success: true,
        role
      })
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const role = await Role.update({ name }, { where: { id } });
      res.status(200).json({
        success: true,
        role
      })
    } catch (err) {
      next(err);
    }

  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Role.destroy({ where: { id } })
      res.status(200).json({
        success: true
      })
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const roles = await Role.findAll();
      res.status(200).json({
        success: true,
        roles
      })
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const role = await Role.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        role
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RoleController();