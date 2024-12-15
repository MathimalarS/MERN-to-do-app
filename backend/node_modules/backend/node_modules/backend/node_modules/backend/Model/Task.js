const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }, // Flag to indicate if the task is deleted
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
