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

const {
  USER_WITH_EMAIL_EXISTS_ERR_MSG,
  INVALID_USER_DATA_ERR_MSG,
  INVALID_EMAIL_OR_PASSWORD_ERR_MSG,
} = require('../utils/constants');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ConflictError(USER_WITH_EMAIL_EXISTS_ERR_MSG);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    const selectedUser = await User.findById(user._id).select('-password');
    return res.status(201).send(selectedUser);
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError(USER_WITH_EMAIL_EXISTS_ERR_MSG));
    }
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new InvalidError(INVALID_USER_DATA_ERR_MSG));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_ERR_MSG);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD_ERR_MSG);
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
