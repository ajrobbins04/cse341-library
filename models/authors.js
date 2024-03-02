const mongoose = require('mongoose');

// define shape of documents w/in contacts collection
const authorSchema = new mongoose.Schema({
  authorFirstName: String,
  authorLastName: String,
  numBooksAvailable: Number,
  numBooksTotal: Number,
});

// create Book model (model name used by mongoose, not the db)
const Author = mongoose.model('Author', authorSchema);

// export Book model as module
module.exports = Author;
