const userStore = require('../store/userStore');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');

exports.signup = async ({ username, password, role }) => {
  const existingUser = await userStore.findByUsername(username);
  if (existingUser) throw new Error('Username already taken');

  const hashedPassword = await bcrypt.hashPassword(password);
  const newUser = await userStore.createUser({ 
    username, 
    password: hashedPassword, 
    role 
  });

  const token = jwt.generateToken({ 
    id: newUser._id, 
    username: newUser.username,
    role: newUser.role 
  });
  
  return { 
    user: {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role
    },
    token 
  };
};

exports.signin = async ({ username, password }) => {
  const user = await userStore.findByUsername(username);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.comparePasswords(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.generateToken({ 
    id: user._id, 
    username: user.username,
    role: user.role 
  });
  
  return { 
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    },
    token 
  };
};