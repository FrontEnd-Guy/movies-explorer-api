const { requestLogger, errorLogger } = require('../config/logger');

const logRequest = (req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    queryParams: req.query,
    body: req.body,
  });
  next();
};

const logError = (err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
  });
  next(err);
};

module.exports = {
  logRequest,
  logError,
};
