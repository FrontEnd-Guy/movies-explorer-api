const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const {
  InvalidError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.status(200).send(movies);
  } catch (error) {
    return next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  const movieData = { ...req.body, owner: req.user._id };
  try {
    const movie = await Movie.create(movieData);
    return res.status(201).send(movie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new InvalidError('Error creating movie'));
    }
    return next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);

    if (!movie) {
      return next(new NotFoundError('Movie not found'));
    }
    if (movie.owner.toString() !== req.user._id) {
      return next(new ForbiddenError("You can't delete other people's movies"));
    }
    await Movie.deleteOne(movie);
    return res.status(200).send({ message: 'Movie deleted' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new InvalidError('Invalid movie id'));
    }
    return next(error);
  }
};
