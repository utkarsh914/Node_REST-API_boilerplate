const winston = require("winston");

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  const status = err.status || 500;
  res.status(status).send("Some error occured!");
};
