const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await registerUser(username, email, password);
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        username: user.username,
        email: user.email,
        password: user.password,  // For security reasons, it's not recommended to return the hashed password.
        _id: user._id,
        __v: user.__v
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
