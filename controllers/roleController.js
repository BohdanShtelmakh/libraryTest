const { Role } = require('../models/role');

class RoleController {
  async create(req, res) {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.status(200).json({
      success: true,
      role
    })
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const role = await Role.update({ name }, { where: { id } });
    res.status(200).json({
      success: true,
      role
    })
  }

  async delete(req, res) {
    const { id } = req.params;
    await Role.destroy({ where: { id } })
    res.status(200).json({
      success: true
    })
  }

  async getAll(req, res) {
    const roles = await Role.findAll();
    res.status(200).json({
      success: true,
      roles
    })
  }

  async getById(req, res) {
    const { id } = req.params;
    const role = await Role.findOne({ where: { id } });
    res.status(200).json({
      success: true,
      role
    })
  }
}

module.exports = new RoleController();