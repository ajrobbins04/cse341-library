const mongoose = require('mongoose');

// define shape of documents w/in contacts collection
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genre: {
    type: String,
    enum: [
      'Fiction',
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
  },
  isPictureBook: Boolean,
  numAvailable: Number,
  numTotal: Number,
  yearPublished: Number,
});

// create Book model (model name used by mongoose, not the db)
const Book = mongoose.model('Book', bookSchema);

// export Book model as module
module.exports = Book;
