const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Book = require('../models/books');

const getAllData = async (req, res) => {
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

// exports obj containing these methods
module.exports = {
  getAllData,
};
