const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[-a-zA-Z0-9@:%_+.~#?&//=]*$/;
const USER_WITH_EMAIL_EXISTS_ERR_MSG = 'User with this email already exists';
const INVALID_USER_DATA_ERR_MSG = 'Invalid user data';
const INVALID_EMAIL_OR_PASSWORD_ERR_MSG = 'Invalid email or password';
const ERROR_CREATING_MOVIE_ERR_MSG = 'Error creating movie';
const MOVIE_NOT_FOUND_ERR_MSG = 'Movie not found';
const CANT_DELETE_OTHERS_MOVIES_ERR_MSG = "You can't delete other people's movies";
const INVALID_MOVIE_ID_ERR_MSG = 'Invalid movie id';
const ERROR_UPDATING_USER_ERR_MSG = 'Error updating user information';
const EMAIL_ALREADY_EXISTS_ERR_MSG = 'Email already exists';
const PAGE_NOT_FOUND_ERR_MSG = '404. Page Not Found.';

module.exports = {
  urlRegex,
  USER_WITH_EMAIL_EXISTS_ERR_MSG,
  INVALID_USER_DATA_ERR_MSG,
  INVALID_EMAIL_OR_PASSWORD_ERR_MSG,
  ERROR_CREATING_MOVIE_ERR_MSG,
  MOVIE_NOT_FOUND_ERR_MSG,
  CANT_DELETE_OTHERS_MOVIES_ERR_MSG,
  INVALID_MOVIE_ID_ERR_MSG,
  ERROR_UPDATING_USER_ERR_MSG,
  EMAIL_ALREADY_EXISTS_ERR_MSG,
  PAGE_NOT_FOUND_ERR_MSG,
};
