const express = require('express');
const router = express.Router();
const Note = require('../Model/Note'); // Make sure the path to the Note model is correct

// @route   POST /api/notes
// @desc    Create a new note
router.post('/', async (req, res) => {
  const { title, color, image, voice, position = { top: 20, left: 20 } } = req.body; // Add default position

  // Ensure title is provided
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    // Create a new note instance with the provided fields
    const newNote = new Note({
      title,
      color: color || '#f7dc6f', // Default color if none is provided
      image: image || '', // Default empty image if none is provided
      voice: voice || '', // Default empty voice if none is provided
      position // Save position data (default or provided)
    });

    // Save the new note to the database
    const note = await newNote.save();
    res.json(note); // Return the newly created note as a response
  } catch (error) {
    console.error('Error adding note:', error); // Log the complete error details
    res.status(500).json({ message: 'Error adding note', error: error.message });
  }
});

module.exports = router;
