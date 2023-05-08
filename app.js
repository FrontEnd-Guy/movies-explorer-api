require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { userRoutes, movieRoutes, authRoutes } = require('./routes');
const auth = require('./middlewares/auth');
const { logRequest, logError } = require('./middlewares/logging');
const connectDB = require('./config/connect');
const { NotFoundError } = require('./errors');
const { errorHandler } = require('./middlewares/errors');

const app = express();

connectDB(); // Подключение к базе данных при запуске сервера

app.use(express.json());

app.use(logRequest);

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://pavel.nomoredomains.monster',
    'https://pavel.nomoredomains.monster'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(authRoutes);
app.use(auth); // Защита всех следующих роутов авторизацией
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('*', (req, res, next) => {
  next(new NotFoundError('404. Page Not Found.'));
});

app.use(logError);
app.use(errors());

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
