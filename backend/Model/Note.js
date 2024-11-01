const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true }, // This represents the note's text in the frontend
  color: { type: String, default: 'blueviolet' }, // Default color if not provided
  time: { type: Date, default: Date.now }, // Capture when the note was created
  position: {
    top: { type: Number, default: 20 },
    left: { type: Number, default: 20 }
  }
});

module.exports = mongoose.model('Note', NoteSchema);
