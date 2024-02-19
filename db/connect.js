const mongoose = require('mongoose');

const connect = async () => {
  try {
    // connect to mongodb via its uri
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return mongoose;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
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

module.exports = { connectDB };
