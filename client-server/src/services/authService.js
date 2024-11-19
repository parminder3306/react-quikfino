const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/Database');

exports.register = async (data) => {
  const { username, password } = data;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) throw new Error('Username already exists');

  const user = await User.create({ username, password });
  return user.password;
};

exports.login = async (data) => {
  const { username, password } = data;
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: '1h',
  });
  return token;
};
