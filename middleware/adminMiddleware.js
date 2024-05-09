const { Role } = require('../models/role');
const CustomError = require('../util/exeptionUtil');
module.exports = async (req, res, next) => {
  try {
    const { role_id } = req.user;
    const role = await Role.findOne({ where: { id: role_id } });
    console.log(role);
    if (role === null) {
      throw new CustomError('No such role', 401);
    } else if (role.name !== 'admin') {
      throw new CustomError('You are not have permission for this', 401);
    }
    next();
  } catch (error) {
    next(error)
  }
}