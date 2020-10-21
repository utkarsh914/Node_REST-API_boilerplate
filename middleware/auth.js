require("express-async-errors");
const jwt = require("jsonwebtoken");

const userAuth = function (req, res, next) {
  // app sends token in header
  const token = req.header("token");
  if (!token) {
    return res.status(401).send("Auth Error: No JWT token specified");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role === "user") {
      req.user = decoded.user;
      next();
    } else res.status(500).send("Not allowed");
  } catch (e) {
    console.error(e);
    res.status(500).send("Invalid Token");
  }
};

const adminAuth = function (req, res, next) {
  // app sends token in header
  const token = req.header("token");
  if (!token) {
    return res.status(401).send("Auth Error: No JWT token specified");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user.role === "admin") {
      req.user = decoded.user;
      next();
    } else res.status(500).send("Not allowed");
  } catch (e) {
    console.error(e);
    res.status(500).send("Invalid Token");
  }
};

module.exports = { userAuth, adminAuth };
