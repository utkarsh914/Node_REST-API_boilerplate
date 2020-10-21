require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4444;

require("./startup/logging")();
require("./startup/db")();
require("./startup/middlewares")(app);
require("./startup/routes")(app);

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
