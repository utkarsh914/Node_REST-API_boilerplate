const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const express = require("express");

module.exports = (app) => {
  // configure CORS
  app.use(cors());
  // display these files statically as they are
  app.use("/", express.static(path.join(__dirname, "/public")));
  // bodyparser
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  // morgan for logging all requests
  if (process.env.NODE_ENV !== "production") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
  }
};
