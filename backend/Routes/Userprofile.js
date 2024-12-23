const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require('../authenticate');
const User = require('../Model/user'); // Import User model

// Fetch user profile (GET request)
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Profile fetched successfully', data: { email: user.email } });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// Update user profile (PUT request)
router.put('/', authenticate, async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: 'Profile updated successfully', data: { email: user.email } });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

module.exports = router;
