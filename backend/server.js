const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./authenticate"); // Make sure this handles DB connection and JWT auth logic.
const morgan = require('morgan');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI; // Your MongoDB URI

// Import Routes
const taskRoutes = require('./Routes/Taskroute');
const calendarRoutes = require('./Routes/CalendarRoutes');
const deletedRoutes = require('./Routes/DeletedRoutes');
const profileRoute = require('./Routes/Userprofile'); 
const userRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Database Connection and Authentication Middleware
connection(); // Make sure this is connecting to the DB and setting up JWT auth middleware

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in middleware to parse JSON
app.use(morgan('dev')); // HTTP request logger

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/deletedTasks', deletedRoutes);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Error handling middleware (catch errors not handled by routes)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// CORS Configuration (Allow requests from your frontend URL)
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
