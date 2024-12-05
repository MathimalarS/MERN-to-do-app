const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./Routes/Taskroute');
const calendarRoutes = require('./Routes/CalendarRoutes');
const deletedRoutes = require('./Routes/DeletedRoutes'); // Ensure it's named properly
const morgan = require('morgan');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log requests

// Routes
app.use('/api/tasks', taskRoutes);  // Task routes
app.use('/api/calendar', calendarRoutes);  // Calendar routes
app.use('/api/deletedTasks', deletedRoutes); // Deleted tasks routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err);
  });

// Error handling middleware for async routes
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
