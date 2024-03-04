const mongoose = require('mongoose');

// define shape of documents w/in authors collection
const authorSchema = new mongoose.Schema({
  authorFirstName: String,
  authorLastName: String,
});

// create Author model (model name used by mongoose, not the db)
const Author = mongoose.model('Author', authorSchema);

// export Author model as module
module.exports = Author;
