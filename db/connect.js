const mongoose = require('mongoose');

const connectDB = async () => {
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

module.exports = { connectDB };
