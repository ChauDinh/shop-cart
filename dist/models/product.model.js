const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  author: [String],
  categories: [String],
  image: String,
  created_at: Date
});

const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;