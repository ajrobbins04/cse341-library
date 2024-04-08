const mongoose = require('mongoose');
const { MONGODB_URI } = require('../helpers/config');

const connect = async () => {
  try {
    // connect to mongodb via its uri
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    error.message = `Error connecting to MongoDB: ${error.message}`;
    throw error;
  }
};

const connectDB = async () => {
  try {
    console.log('Connecting...');
    await connect();
  } catch (error) {
    console.error(error);
  }
};

const disconnectDB = async () => {
  try {
    console.log('Disconnecting...');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

module.exports = { connectDB, disconnectDB };
