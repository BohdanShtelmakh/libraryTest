const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');

router.post('', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);
router.get('/all', RoleController.getAll);
router.get('/:id', RoleController.getById);

module.exports = router;
