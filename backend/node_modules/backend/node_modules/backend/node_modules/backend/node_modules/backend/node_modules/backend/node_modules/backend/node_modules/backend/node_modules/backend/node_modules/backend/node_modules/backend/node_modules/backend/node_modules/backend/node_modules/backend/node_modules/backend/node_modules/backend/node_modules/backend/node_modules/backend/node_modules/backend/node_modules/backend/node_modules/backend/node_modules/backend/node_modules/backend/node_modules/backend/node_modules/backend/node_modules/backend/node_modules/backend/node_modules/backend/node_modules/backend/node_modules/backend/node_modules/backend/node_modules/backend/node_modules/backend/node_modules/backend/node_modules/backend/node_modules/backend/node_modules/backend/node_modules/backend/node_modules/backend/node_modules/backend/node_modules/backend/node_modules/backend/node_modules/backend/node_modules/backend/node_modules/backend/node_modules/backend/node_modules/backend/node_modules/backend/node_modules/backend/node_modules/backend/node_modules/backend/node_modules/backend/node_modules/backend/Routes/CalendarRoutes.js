// routes/calendarRoutes.js
const express = require('express');
const router = express.Router();
const CalendarEvent = require('../Model/Calendar');

// Get all calendar events
router.get('/', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching calendar events' });
  }
});

// Add a new calendar event
router.post('/', async (req, res) => {
  const { title, date, description } = req.body;

  const newEvent = new CalendarEvent({ title, date, description });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating calendar event' });
  }
});

// Update a calendar event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, description } = req.body;

  try {
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(id, { title, date, description }, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating calendar event' });
  }
});

// Delete a calendar event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await CalendarEvent.findByIdAndDelete(id);
    res.json({ message: 'Calendar event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting calendar event' });
  }
});

module.exports = router;
