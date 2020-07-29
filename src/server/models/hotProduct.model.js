const mongoose = require("mongoose");

const HotProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const HotProduct = mongoose.model(
  "HotProduct",
  HotProductSchema,
  "hotproducts"
);

module.exports = HotProduct;
