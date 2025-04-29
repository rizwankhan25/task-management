// backend/seed.js
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Task = require('../models/Task');

const seedTasks = [
  {
    title: 'Complete project documentation',
    description: 'Finalize and submit the project documentation.',
    dueDate: new Date('2025-05-01'),
    priority: 'High',
    completed: false
  },
  {
    title: 'Team meeting',
    description: 'Discuss project milestones and deadlines.',
    dueDate: new Date('2025-05-03'),
    priority: 'Medium',
    completed: false
  },
  {
    title: 'Code review',
    description: 'Review code for the new feature implementation.',
    dueDate: new Date('2025-05-05'),
    priority: 'Low',
    completed: false 
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Task.deleteMany(); // Optional: Clears existing tasks
    await Task.insertMany(seedTasks);
    console.log('✅ Static tasks inserted successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error inserting static tasks:', err);
    mongoose.connection.close();
  }
};

seedDB();
