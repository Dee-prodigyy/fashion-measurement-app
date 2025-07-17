const express = require('express');
const { register, login } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', login);

// ✅ @route   GET /api/auth/verify?token=xxx
// @desc    Verify email address
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).send('User not found.');

    if (user.isVerified) {
      return res.status(200).send('Email already verified.');
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send('Email verified successfully. You can now log in.');
  } catch (err) {
    console.error('Email verification error:', err.message);
    res.status(400).send('Invalid or expired verification link.');
  }
});

module.exports = router;
