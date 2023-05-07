const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { register, login } = require('../controllers/authController');

const router = express.Router();

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

router.post('/signup', userCreateValidation, register);
router.post('/signin', userLoginValidation, login);

module.exports = router;
