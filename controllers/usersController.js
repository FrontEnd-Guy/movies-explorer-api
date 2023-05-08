const mongoose = require('mongoose');

const User = require('../models/User');
const { InvalidError } = require('../errors');

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).send(user);
  } catch (error) {
    return next(error);
  }
};

exports.updateMe = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    ).select('-password');
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new InvalidError('Error updating user information'));
    }
    if (error.code === 11000 && error.keyPattern.email) {
      return next(new InvalidError('Email already exists'));
    }
    return next(error);
  }
};
