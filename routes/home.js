require("express-async-errors");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send("API is Working!");
});

module.exports = router;
