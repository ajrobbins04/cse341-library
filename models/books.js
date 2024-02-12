const mongoose = require('mongoose');

// define shape of documents w/in contacts collection
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  authorFirstName: String,
  authorLastName: String,
  numAvailable: Number,
  numTotal: Number,
  yearPublished: Number,
});

// create Book model (model name used by mongoose, not the db)
const Book = mongoose.model('Book', bookSchema);

// export Book model as module
module.exports = Book;
