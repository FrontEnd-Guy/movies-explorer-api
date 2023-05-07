const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMe, updateMe } = require('../controllers/usersController');

const router = express.Router();

router.get('/me', getMe);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateMe,
);

module.exports = router;
