const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./Routes/Taskroute');
const calendarRoutes = require('./Routes/CalendarRoutes');
const deletedRoutes = require('./Routes/DeletedRoutes'); 
const signuproute=require('./Routes/SignupRoute');
const loginRoute = require('./Routes/LoginRoute');

const morgan = require('morgan');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

app.use('/api/tasks', taskRoutes);  
app.use('/api/calendar', calendarRoutes); 
app.use('/api/deletedTasks', deletedRoutes);
app.use('/api/signup',signuproute);
app.use('/api/login',loginRoute)


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
