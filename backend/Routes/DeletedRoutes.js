const express = require('express');
const cron = require('node-cron');
const DeletedTask = require('../Model/DeletedTask');
const Task = require('../Model/Task'); // Assuming your Task model for active tasks is here
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

router.post('/deletedTasks/restore/:id', async (req, res) => {
  const { id } = req.params;  // This will get the task ID from the URL
  console.log('Restoring task with ID:', id);  // Debugging line

  try {
    // Logic to restore the task
    const restoredTask = await DeletedTask.findByIdAndDelete(id); // Delete the task from the DeletedTask collection
    if (!restoredTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Restore the task to the original collection (e.g., TodoTask)
    const restoredTaskData = new TodoTask({
      text: restoredTask.text,
      completed: restoredTask.completed,
      date: restoredTask.date,
    });

    await restoredTaskData.save();
    res.status(200).json(restoredTaskData);
  } catch (error) {
    console.error('Error restoring task:', error);
    res.status(500).json({ error: 'Error restoring task' });
  }
});



module.exports = router;
