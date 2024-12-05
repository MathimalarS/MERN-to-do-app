const express = require('express');
const router = express.Router();
const Task = require('../Model/Task');
const DeletedTask = require('../Model/DeletedTask'); // Import the DeletedTask model

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { text, date } = req.body;
  const newTask = new Task({ text, date });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update task (toggle completion)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed, date } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { text, completed, date }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task (move to deletedTasks collection)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task to delete
    const taskToDelete = await Task.findById(id);
    if (!taskToDelete) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Create a new deleted task document
    const deletedTask = new DeletedTask({
      text: taskToDelete.text,
      date: taskToDelete.date,
      completed: taskToDelete.completed,
      deletedAt: Date.now(), // Record the deletion time
    });

    // Save the deleted task in the deletedTasks collection
    await deletedTask.save();

    // Now delete the task from the tasks collection
    await Task.findByIdAndDelete(id);

    res.json({ message: 'Task moved to deleted tasks successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
