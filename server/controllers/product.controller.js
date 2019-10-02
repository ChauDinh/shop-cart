const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.index = async (req, res) => {
  const products = await Product.find().sort({created_at: -1});
  res.render('index', {
    products: products,
  });
};

module.exports.create = (req, res) => {
  res.render('product/create');
};

module.exports.view = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({_id: id});
  let cart = await Cart.findOne({owner: req.signedCookies.userId});
  if (product) {
    res.cookie('productId', product._id, {
      signed: true,
    });
  }
  res.render('product/view', {
    product: product,
    pathImage: product ? product.image : '',
    cartNumber: cart ? cart.items.length : '',
  });
};

module.exports.add = async (req, res) => {
  let product = new Product({
    name: req.body.name,
    author: req.body.author.split(', '),
    categories: req.body.categories.split(', '),
    image: req.file.path,
    created_at: new Date(),
  });
  await product.save();
  res.redirect('/');
};
