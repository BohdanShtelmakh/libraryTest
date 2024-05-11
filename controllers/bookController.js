const { Book } = require('../models/book');
class BookController {
  async create(req, res, next) {
    try {
      const { title, author, year, genre } = req.body;
      const book = await Book.create({ title, author, year, genre });
      res.status(200).json({
        success: true,
        book
      })
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, author, year, genre } = req.body;
      const book = await Book.update({ title, author, year, genre }, { where: { id } });
      res.status(200).json({
        success: true,
        book
      })
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.destroy({ where: { id } });
      res.status(200).json({
        success: true,
        book
      })
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const books = await Book.findAll();
      res.status(200).json({
        success: true,
        books
      })
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findOne({ where: { id } });
      res.status(200).json({
        success: true,
        book
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BookController();