const winston = require("winston");
require("express-async-errors");

module.exports = () => {
  winston.add(
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "logFile.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
