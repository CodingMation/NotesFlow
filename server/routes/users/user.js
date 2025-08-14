const User = require('../../models/User')

const express = require('express');
const { body, check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router()

// User Registration
// http://localhost:5000/api/auth/register
router.post("/register",
  [
    check('username')
      .not().isEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    check('email')
      .isEmail().withMessage('Please include a valid email')
      .normalizeEmail(),
    check('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if email exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ 
          errors: [{ msg: 'User with this email already exists' }] 
        });
      }

      // Check if username exists
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ 
          errors: [{ msg: 'User is already taken' }] 
        });
      }

      // Create new user
      user = new User({ username, email, password });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create and return token
      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ 
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ 
        errors: [{ msg: 'Server error' }] 
      });
    }
  }
);

// User Login
// http://localhost:5000/api/auth/login
router.post("/login",
  [
    body("email").isEmail().withMessage('Please include a valid email'),
    body("password")
    .exists().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters') 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ 
          errors: [{ msg: "Invalid credentials" }] 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          errors: [{ msg: "Invalid credentials password" }] // Same message for security
        });
      }

      const payload = { 
        id: user._id,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        } // Optional: include more user data
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ 
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ 
        errors: [{ msg: "Server error" }] 
      });
    }
  }
);

module.exports = router