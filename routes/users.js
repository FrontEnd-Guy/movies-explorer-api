const express = require('express');
const { getMe, updateMe } = require('../controllers/usersController');
const { userUpdateValidation } = require('../middlewares/validation');

const router = express.Router();

router.get('/me', getMe);
router.patch('/me', userUpdateValidation, updateMe);

module.exports = router;
