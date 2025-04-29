// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
// Routes
const taskRoute = require('./routes/tasks');
const userRoute = require('./routes/users');
const app = express();
const PORT = 5000;

//Connect to MongoDB

connectDB();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/tasks', taskRoute);
app.use('/api/users', userRoute); 

// Root route
app.get('/', (req, res) => {
  res.send('/ route from backend!');
});
 
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
