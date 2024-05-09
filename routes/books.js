const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('', adminMiddleware, BookController.create);
router.put('/:id', adminMiddleware, BookController.update);
router.delete('/:id', adminMiddleware, BookController.delete);
router.get('/all', BookController.getAll);
router.get('/:id', BookController.getById);

module.exports = router;
