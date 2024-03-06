const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// define shape of documents w/in contacts collection
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  // is array to handle instances w/multiple authors
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  genres: {
    type: String,
    enum: [
      'Fiction',
      'Picture Books',
      'Fantasy',
      'Mystery',
      'Humor',
      'Folklore',
      'Historical Fiction',
      'Realistic Fiction',
      'Animal Fiction',
      'Non-Fiction',
      'Unspecified',
    ],
    default: 'Unspecified', // used when no genre is provided
  },
  numAvailable: Number,
  numTotal: Number,
  yearPublished: Number,
});

// create Book model (model name used by mongoose, not the db)
const Book = mongoose.model('Book', bookSchema);

// export Book model as module
module.exports = Book;
