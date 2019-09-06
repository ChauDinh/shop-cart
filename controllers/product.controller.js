const Product = require("../models/product.model");
const User = require("../models/user.model");

module.exports.index = async (req, res) => {
  const products = await Product.find().sort({ created_at: -1 });
  res.render("index", {
    products: products
  });
};

module.exports.create = (req, res) => {
  res.render("product/create");
};

module.exports.view = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ _id: id });
  res.render("product/view", {
    product: product,
    pathImage: product.image
      .split("/")
      .slice(1)
      .join("/")
  });
};

module.exports.add = async (req, res) => {
  let product = new Product({
    name: req.body.name,
    author: req.body.author.split(","),
    categories: req.body.categories.split(","),
    image: req.file.path,
    created_at: new Date()
  });
  await product.save();
  res.redirect("/");
};
