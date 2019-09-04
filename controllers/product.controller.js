const Product = require("../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find();
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
    product: product
  });
};

module.exports.add = async (req, res) => {
  let errors = [];
  if (!req.body.name) {
    errors.push("Tên sản phẩm là bắt buộc!");
  }
  if (!req.body.author) {
    errors.push("Tác giả, nguồn gốc sản phẩm là bắt buộc!");
  }
  if (!req.body.categories) {
    errors.push("Sản phẩm phải thuộc ít nhất 1 category!");
  }

  if (errors.length) {
    res.render("product/create", {
      errors: errors,
      values: req.body
    });
    return;
  }

  let product = new Product({
    name: req.body.name,
    author: req.body.author.split(","),
    categories: req.body.categories.split(","),
    created_at: new Date()
  });
  await product.save();
  res.redirect("/");
};
