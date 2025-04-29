// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/task-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) { 
    console.error('❌ DB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
