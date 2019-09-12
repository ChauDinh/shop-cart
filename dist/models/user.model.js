"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;