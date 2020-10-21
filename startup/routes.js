const errorMiddleware = require("../middleware/error");
const home = require("../routes/home");
const user = require("../routes/user");

module.exports = (app) => {
  app.use("/", home);
  app.use("/user", user);
  // if route not found, create 404 error and pass to error logger middleware
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  // handle unhandled errors
  app.use(errorMiddleware);
};
