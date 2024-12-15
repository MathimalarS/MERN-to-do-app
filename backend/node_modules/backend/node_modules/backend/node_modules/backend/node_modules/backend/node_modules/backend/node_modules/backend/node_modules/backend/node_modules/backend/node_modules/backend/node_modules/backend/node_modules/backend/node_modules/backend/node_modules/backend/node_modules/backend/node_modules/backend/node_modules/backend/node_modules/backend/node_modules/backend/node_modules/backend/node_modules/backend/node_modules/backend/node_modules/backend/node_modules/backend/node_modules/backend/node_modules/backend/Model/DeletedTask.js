const mongoose = require('mongoose');

const deletedTaskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    deletedAt: { type: Date, required: true }, // The date when the task was deleted
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const DeletedTask = mongoose.model('DeletedTask', deletedTaskSchema);

module.exports = DeletedTask;
