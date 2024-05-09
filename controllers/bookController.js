const { Book } = require('../models/book');
class BookController {
  async create(req, res) {
    const { title, author, year, genre, description } = req.body;
    const book = await Book.create({ title, author, year, genre, description });
    res.status(200).json({
      success: true,
      book
    })
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, author, year, genre, description } = req.body;
    const book = await Book.update({ title, author, year, genre, description }, { where: { id } });
    res.status(200).json({
      success: true,
      book
    })
  }

  async delete(req, res) {
    const { id } = req.params;
    const book = await Book.destroy({ where: { id } });
    res.status(200).json({
      success: true,
      book
    })
  }

  async getAll(req, res) {
    const books = await Book.findAll();
    res.status(200).json({
      success: true,
      books
    })
  }

  async getById(req, res) {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    res.status(200).json({
      success: true,
      book
    })
  }
}

module.exports = new BookController();