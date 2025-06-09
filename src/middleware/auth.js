const jwt = require('../utils/jwt');

const authMiddleware = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. No token provided.'
        });
      }

      const decoded = jwt.verifyToken(token);
      req.user = decoded;

      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Insufficient permissions.'
        });
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
  };
};

module.exports = authMiddleware;