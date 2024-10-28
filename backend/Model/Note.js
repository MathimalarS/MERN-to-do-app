const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: String,
  image: String,
  voice: String,
  position: {
    top: { type: Number, default: 20 },
    left: { type: Number, default: 20 }
  }
});

module.exports = mongoose.model('Note', NoteSchema);
