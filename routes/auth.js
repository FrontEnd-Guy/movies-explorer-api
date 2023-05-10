const express = require('express');
const { register, login } = require('../controllers/authController');
const { userCreateValidation, userLoginValidation } = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', userCreateValidation, register);
router.post('/signin', userLoginValidation, login);

module.exports = router;
