/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Author = require('../models/authors');
const Book = require('../models/books'); // for retrieving all author's books in inventory

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();

    // respond with ok status and the list of authors
    return res.status(200).json(authors);
  } catch (err) {
    // include error details
    err.message = `Error occurred while retrieving data for all authors: ${err.message}`;
    next(err);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    // req.params.id is in valid objectID form at this point
    const author = await Author.findById(req.params.id);
    if (!author) {
      // return a 404 not found status response
      return res.status(404).json({ error: 'Author not found' });
    }

    // respond with ok status and the author
    return res.status(200).json(author);
  } catch (err) {
    // include error details
    err.message = `Error occurred while retrieving an author by id: ${err.message}`;
    next(err);
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const author = new Author({
      // retrieve all necessary data from request body]
      authorFirstName: req.body.authorFirstName,
      authorLastName: req.body.authorLastName,
    });

    // save new author to the db
    const result = await author.save();

    // return 201 status and the id of the new author
    res.status(201).json({ id: result._id });
  } catch (err) {
    // include error details
    err.message = `Error occurred while adding an author to MongoDB: ${err.message}`;
    next(err);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    // req.params.id is in valid objectID form at this point
    const currAuthor = await Author.findById(req.params.id);

    if (!currAuthor) {
      // the author with the given ID is not found
      return res.status(404).json({ error: 'Author not found.' });
    }

    // Update the current author with the new data
    currAuthor.authorFirstName = req.body.authorFirstName;
    currAuthor.authorLastName = req.body.authorLastName;

    // Save the updated author
    const result = await currAuthor.save();

    // send 204 status when the update is complete
    res.status(204).send();
  } catch (err) {
    // include error details
    err.message = `Error occurred while updating an author: ${err.message}`;
    next(err);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    // req.params.id is in valid objectID form at this point
    const result = await Author.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: 'Author not found' });
    }
    // send 200 status when book is successfully deleted
    res.status(200).send();
  } catch (err) {
    // include error details
    err.message = `Error occurred while deleting Author: ${err.message}`;
    next(err);
  }
};

const getAllBooksByAuthorId = async (req, res, next) => {
  try {
    // req.params.id is in valid objectID form at this point
    // the author field will be populated w/the author's name
    const books = await Book.find({ author: req.params.id }).populate('author');
    if (!books) {
      // return a 404 not found status response
      return res.status(404).json({ error: 'Author not found' });
    }

    // respond with ok status and the books
    return res.status(200).json(books);
  } catch (err) {
    // include error details
    err.message = `Error occurred while retrieving books by author id: ${err.message}`;
    next(err);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getAllBooksByAuthorId,
};
