const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require('../authenticate');
const User = require('../Model/user'); // Assuming User model is defined in 'Model/user.js'

// Fetch profile (GET /api/profile)
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Get user by ID from JWT payload
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile (PUT /api/profile)
router.put('/', authenticate, async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findById(req.user.id); // Get user by ID from JWT payload
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email; // Update email

    if (newPassword) {
      const salt = await bcrypt.genSalt(10); // Hash the new password
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save(); // Save the updated user data
    res.json({ email: user.email }); // Return updated email
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
