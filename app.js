require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const { logRequest, logError } = require('./middlewares/logging');
const connectDB = require('./config/connect');
const { NotFoundError } = require('./errors');

const app = express();

connectDB(); // Подключение к базе данных при запуске сервера

app.use(express.json());

app.use(logRequest);

app.use(authRoutes);
app.use(auth); // Защита всех следующих роутов авторизацией
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('*', (req, res, next) => {
  next(new NotFoundError('404. Page Not Found.'));
});

app.use(logError);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).send({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
