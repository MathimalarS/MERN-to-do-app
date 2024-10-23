const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./Routes/Taskroute');
const calendarRoutes = require('./Routes/CalendarRoutes');
const NoteRoutes = require('./Routes/NodeRoute');
const morgan = require('morgan');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log requests

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/notes', NoteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
