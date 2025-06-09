const User = require('../models/User');

exports.findByUsername = (username) => {
  return User.findOne({ username });
};

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};