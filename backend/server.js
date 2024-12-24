const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./authenticate");
const morgan = require('morgan');
require('dotenv').config();

const taskRoutes = require('./Routes/Taskroute');
const calendarRoutes = require('./Routes/CalendarRoutes');
const deletedRoutes = require('./Routes/DeletedRoutes');
const profileRoute = require('./Routes/Userprofile'); 
const user=require('./Routes/users');
const auth=require('./Routes/auth');

const app = express();
const port = process.env.PORT || 5000;
connection();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/deletedTasks', deletedRoutes);
app.use('/api/profile', profileRoute); 
app.use('/api/auth',auth);
app.use('/api/users',user);

mongoose.connect('mongodb+srv://Malar:<Mmsara$04>@cluster0.nuh28.mongodb.net/TODO?retryWrites=true&w=majority&appName=Cluster0');


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
