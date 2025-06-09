const jwt = require('../utils/jwt');

module.exports = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verifyToken(token);
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded; // attach user data
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
