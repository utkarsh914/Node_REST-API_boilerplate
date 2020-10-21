require("express-async-errors");
const express = require("express");
const router = express.Router();
// models
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send("User Already Exists");
  }
  user = new User({ email, password });
  await user.save();
  // const token = user.generateAuthToken();
  await user.sendOtp();
  res.status(200).send("OPT has been sent on the email!");
});

router.post("/sendotp", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email");
  await user.sendOtp();
  return res.status(200).send("OPT has been sent on the email!");
});

router.post("/verifyotp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email");
  const result = await user.verifyOtp(otp);
  if (!result) return res.status(400).send("Incorrect OTP!");
  return res.status(200).send("Email verified and account activated successfully!");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.error("User Not Exist");
    return res.status(400).send("User Not Exist");
  }
  if (!user.isActive) {
    return res.status(400).send("Email not verified!");
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    console.log("Incorrect Password !");
    return res.status(400).send("Incorrect Password!");
  }

  const token = user.generateAuthToken();
  res.status(200).json({ token });
});

module.exports = router;
