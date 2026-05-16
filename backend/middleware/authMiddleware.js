const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
  // Get token from request header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, access denied' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // attach user info to request
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or expired' })
  }
}

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(403).json({ message: 'Admin access only' })
  }
}

module.exports = { protect, adminOnly }