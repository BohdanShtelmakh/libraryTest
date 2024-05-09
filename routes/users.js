const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('', authMiddleware, adminMiddleware, UserController.create);
router.put('/:id', authMiddleware, adminMiddleware, UserController.update);
router.delete('/:id', authMiddleware, adminMiddleware, UserController.delete);
router.get('/:id', authMiddleware, adminMiddleware, UserController.getById);
router.get('/all', authMiddleware, adminMiddleware, UserController.getAll);

module.exports = router;