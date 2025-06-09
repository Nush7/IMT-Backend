const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const result = await authService.signup({
      username,
      password,
      role: 'user'
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const result = await authService.signin({
      username,
      password
    });

    res.status(200).json({
      success: true,
      message: 'Signin successful',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (err) {
    next(err);
  }
};