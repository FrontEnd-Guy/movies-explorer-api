const { createLogger, format, transports } = require('winston');

const requestLogger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: 'logs/request.log',
      level: 'info',
    }),
  ],
});

const errorLogger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
