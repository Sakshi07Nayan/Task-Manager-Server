const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

const registerUser = async (username, email, password) => {
  const user = new User({ username, email, password });
  await user.save();
  return user;
};

const findUserByEmail = async (email) => await User.findOne({ email });

const findUserById = async (id) => await User.findById(id);

module.exports = { registerUser, findUserByEmail, findUserById };
