"use strict";

const User = require("../models/user.model");

module.exports.add = async (req, res, next) => {
  let errors = [];
  if (!req.body.username) {
    errors.push("Username là bắt buộc!");
  }
  if (!req.body.email) {
    errors.push("Email là bắt buộc!");
  }
  if (!req.body.password) {
    errors.push("Password là bắt buộc!");
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    errors.push("Email này đã được đăng ký!");
  }

  if (errors.length) {
    res.render("user/register", {
      errors: errors,
      values: req.body
    });
  }

  next();
};