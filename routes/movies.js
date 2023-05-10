const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');
const { movieCreateValidation, movieDeleteValidation } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getMovies);
router.post('/', movieCreateValidation, createMovie);
router.delete('/:_id', movieDeleteValidation, deleteMovie);

module.exports = router;
