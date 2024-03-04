const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// define shape of documents w/in contacts collection
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: [ObjectId], // is array to handle instances w/multiple authors
  numAvailable: Number,
  numTotal: Number,
  yearPublished: Number,
});

// create Book model (model name used by mongoose, not the db)
const Book = mongoose.model('Book', bookSchema);

// export Book model as module
module.exports = Book;
