require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  // Check both headers and Authorization Bearer for flexibility
  let token = req.header("x-auth-token");
  
  // Fallback to Authorization header if x-auth-token not found
  if (!token && req.header("Authorization")) {
    const authHeader = req.header("Authorization");
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove "Bearer " prefix
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticate;