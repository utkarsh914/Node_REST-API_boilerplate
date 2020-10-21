require("express-async-errors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mailer = require('../helpers/mailer');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      lowercase: true,
      default: "user",
    },
    otp: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const matchPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const generateAuthToken = function () {
  const payload = {
    user: {
      id: this._id,
      email: this.email,
      role: this.role,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 14 * 24 * 60 * 60,
  });
  return token;
};

const sendOtp = async function() {
  const from = process.env.MAILER_EMAIL;
  const to = this.email;
  const subject = "MY API: Confirm email"
  const otp = Math.floor(Math.random() * 899999 + 100000);
  const html = `<p>Your one time password is <b>${otp}</b></p>`;
  this.otp = otp;
  await this.save();
  return mailer.send(from, to, subject, html);
}

const verifyOtp = async function(otp) {
  if (this.otp === parseInt(otp)) {
    if (!this.isActive) {
      this.isActive = true;
      await this.save();
    }
    return true;
  }
  else return false;
}

UserSchema.methods = {
  sendOtp,
  verifyOtp,
  matchPassword,
  generateAuthToken
}

module.exports = mongoose.model("users", UserSchema);
