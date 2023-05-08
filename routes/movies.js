const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');
const { urlRegex } = require('../utils/constants');

const router = express.Router();

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegex),
      trailerLink: Joi.string().required().pattern(urlRegex),
      thumbnail: Joi.string().required().pattern(urlRegex),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
