const express = require('express');
const router = express.Router();
const Note = require('../Model/Note'); // Ensure this path is correct

// @route   POST /api/notes
// @desc    Create a new note
router.post('/', async (req, res) => {
  const { text, color, position = { top: 20, left: 20 } } = req.body;

  // Validate that the required field 'text' (note title) is present
  if (!text) {
    return res.status(400).json({ message: 'Text (title) is required' });
  }

  try {
    const newNote = new Note({
      title: text,
      color: color || 'blueviolet', // Default color if none provided
      position
    });

    const note = await newNote.save();
    res.status(201).json(note); // Send created note as JSON response
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'Error adding note', error: error.message });
  }
});

module.exports = router;
