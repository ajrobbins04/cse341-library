/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Book = require('../models/books');
const Author = require('../models/authors');

const getAllBooks = async (req, res, next) => {
  try {
    // find all books in the db, and populates author field with their names
    const books = await Book.find().populate('author');

    // respond with ok status and the list of books
    return res.status(200).json(books);
  } catch (err) {
    // include error details
    err.message = `Error occurred while retrieving data for all books: ${err.message}`;
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    // req.params.id is in valid objectID form at this point
    // the author field will be populated w/the author's name
    const book = await Book.findById(req.params.id).populate('author');
    if (!book) {
      // return a 404 not found status response
      return res.status(404).json({ error: 'Book not found' });
    }

    // respond with ok status and the book
    return res.status(200).json(book);
  } catch (err) {
    // include error details
    err.message = `Error occurred while retrieving a book by id: ${err.message}`;
    next(err);
  }
};

const addBook = async (req, res, next) => {
  try {
    const book = new Book({
      // retrieve all necessary data from request body
      title: req.body.title,
      description: req.body.description,
      author: req.params.author,
      numAvailable: req.body.numAvailable,
      numTotal: req.body.numTotal,
      yearPublished: req.body.yearPublished,
    });

    // save new book to the db
    const result = await book.save();

    // return 201 status and the id of the new book
    res.status(201).json({ id: result._id });
  } catch (err) {
    // include error details
    err.message = `Error occurred while adding a book to MongoDB: ${err.message}`;
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    // retrieve book that will be updated by id
    const currBook = await Book.findById(req.params.id);
    // check that the author provided is in the db
    const author = await Author.findById(req.body.author);

    if (!currBook) {
      // the book with the given ID is not found
      return res.status(404).json({ error: 'Book not found.' });
    }

    if (!author) {
      // the author with the given ID is not found
      return res
        .status(404)
        .json({ error: 'Author not found in the database.' });
    }

    // Update the current book with the new data
    currBook.title = req.body.title;
    currBook.description = req.body.description;
    currBook.author = author;
    currBook.numAvailable = req.body.numAvailable;
    currBook.numTotal = req.body.numTotal;
    currBook.yearPublished = req.body.yearPublished;

    // Save the updated book
    const result = await currBook.save();

    // send 204 status when the update is complete
    res.status(204).send();
  } catch (err) {
    // include error details
    err.message = `Error occurred while updating a book: ${err.message}`;
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  // retrieve id from request parameters
  const bookId = new ObjectId(req.params.id);
  try {
    // delete book by the associated id
    const result = await Book.findByIdAndDelete(bookId);

    if (!result) {
      return res.status(404).json({ error: 'Book not found' });
    }
    // send 200 status when book is successfully deleted
    res.status(200).send();
  } catch (err) {
    // include error details
    err.message = `Error occurred while deleting book: ${err.message}`;
    next(err);
  }
};

// exports obj containing these methods
module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
