"use strict";

const mongoose = require("mongoose");
const User = require("./user.model");

const CartSchema = mongoose.Schema({
  owner: String,
  items: [{ productId: String, productName: String }],
  total: Number
});

const Cart = mongoose.model("Cart", CartSchema, "carts");

module.exports = Cart;