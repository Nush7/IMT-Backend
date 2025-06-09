const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const result = await authService.signup({ username, password, role });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login({ username, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
