const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../Model/Signup');  
const router = express.Router();

router.post(
    '/',
    [
        check('email').isEmail().withMessage('Invalid email'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
        check('username').notEmpty().withMessage('Username is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({
                message: 'User created successfully!',
                user: { id: newUser._id, username: newUser.username, email: newUser.email },
            });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Server error during signup' });
        }
    }
);

module.exports = router;
