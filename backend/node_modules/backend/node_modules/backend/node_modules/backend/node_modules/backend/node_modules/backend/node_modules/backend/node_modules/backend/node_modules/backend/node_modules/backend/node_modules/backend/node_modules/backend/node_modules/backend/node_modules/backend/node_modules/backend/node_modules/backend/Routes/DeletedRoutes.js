const express = require('express');
const DeletedTask = require('../Model/DeletedTask');
const TodoTask = require('../Model/Task'); // Assuming your Task model for active tasks is here
const router = express.Router();

// Get all deleted tasks
router.get('/', async (req, res) => {
  try {
    const deletedTasks = await DeletedTask.find(); // Fetch deleted tasks from the database
    res.status(200).json(deletedTasks); // Send the tasks in the response
  } catch (error) {
    console.error('Error fetching deleted tasks:', error);
    res.status(500).json({ error: 'Error fetching deleted tasks' });
  }
});

// In routes/deletedTasks.js

// POST route to restore a deleted task by ID
router.post('/restore/:id', async (req, res) => {
  const { id } = req.params;  // Extract task ID from URL

  console.log('Restoring task with ID:', id);  // Debugging line

  try {
    // Find the deleted task by ID and restore it
    const restoredTask = await DeletedTask.findByIdAndDelete(id); // Remove from deleted collection
    if (!restoredTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Restore the task to the TodoTask collection (or active task collection)
    const restoredTaskData = new TodoTask({
      text: restoredTask.text,
      completed: restoredTask.completed,
      date: restoredTask.date,
    });

    await restoredTaskData.save();
    res.status(200).json(restoredTaskData);  // Respond with restored task data
  } catch (error) {
    console.error('Error restoring task:', error);
    res.status(500).json({ error: 'Error restoring task' });
  }
});


module.exports = router;
