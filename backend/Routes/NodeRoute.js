const express = require('express');
const Note = require('../models/note');
const router = express.Router();

// GET all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post('/notes', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    color: req.body.color,
    image: req.body.image,
    voice: req.body.voice,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing note
router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = req.body.title || note.title;
    note.color = req.body.color || note.color;
    note.image = req.body.image || note.image;
    note.voice = req.body.voice || note.voice;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note
router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    await note.remove();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
