const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Book = require('../models/books');

const getAllBooks = async (req, res) => {
  try {
    // find all contacts in the db
    const books = await Book.find();
    console.log('Data from MongoDB:', books);
    // respond with the list of contacts
    res.json(books);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

const getBookById = async (req, res) => {
  // retrieve id from request parameters
  const bookId = new ObjectId(req.params.id);

  try {
    // find and retrieve a specific book by id
    const book = await Book.findById(bookId);
    console.log('Data from MongoDB:', book);
    res.json(book);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

const addBook = async (req, res) => {
  try {
    // use Book model to add a new book
    const book = new Book({
      // retrieve all necessary data from request body
      title: req.body.title,
      description: req.body.description,
      authorFirstName: req.body.authorFirstName,
      authorLastName: req.body.authorLastName,
      numAvailable: req.body.numAvailable,
      numTotal: req.body.numTotal,
      yearPublished: req.body.yearPublished,
    });

    // save new book to the db
    const result = await book.save();

    // return 201 status and the id of the new book
    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ id: result._id });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Error occurred while adding a book.' });
  }
};

const updateBook = async (req, res) => {
  // retrieve id from request parameters
  const bookId = new ObjectId(req.params.id);
  try {
    // retrieve book that will be updated by id
    const currBook = await Book.findById(bookId);

    if (!currBook) {
      // the book with the given ID is not found
      res.status(404).json({ error: 'Book not found.' });
    }

    // Update the current book with the new data
    currBook.title = req.body.title;
    currBook.description = req.body.description;
    currBook.authorFirstName = req.body.authorFirstName;
    currBook.authorLastName = req.body.authorLastName;
    currBook.numAvailable = req.body.numAvailable;
    currBook.numTotal = req.body.numTotal;
    currBook.yearPublished = req.body.yearPublished;

    // Save the updated book
    const result = await currBook.save();
    console.log(result);
    // send 204 status when book is successfully updated
    res.status(204).send();
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error occurred while updating a book.' });
  }
};

const deleteBook = async (req, res) => {
  // retrieve id from request parameters
  const bookId = new ObjectId(req.params.id);
  try {
    // delete book by the associated id
    const result = await Book.findByIdAndDelete(bookId);
    console.log(result);
    // send 200 status when book successfully deleted
    res.status(200).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error occurred while deleting a book.' });
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
