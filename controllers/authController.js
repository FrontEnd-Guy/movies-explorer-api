const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/User');

const {
  UnauthorizedError,
  ConflictError,
  InvalidError,
} = require('../errors');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    const selectedUser = await User.findById(user._id).select('-password');
    return res.status(201).send(selectedUser);
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError('User with this email already exists'));
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new InvalidError('Invalid user data'));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    return res.status(200).send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
