// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRETE;

module.exports = function (req, res, next) {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if (!token) {
      req.userId = null;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded?.id || null;
    return next();
  } catch (err) {
    req.userId = null;
    return next();
  }
};
