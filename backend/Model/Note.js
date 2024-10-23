const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, default: '#ffffff' },
  image: { type: String },
  voice: { type: String },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
