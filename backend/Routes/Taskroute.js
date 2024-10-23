const express = require('express');
const router = express.Router();
const Task = require('../Model/Task');

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

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
