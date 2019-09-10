const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports.portal = async (req, res) => {
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let list = [...cart.items];
  let listName = list.map(item => item.productName);
  let freqCounter = {};
  for (let el of listName) {
    freqCounter[el] = (freqCounter[el] || 0) + 1;
  }
  res.render("cart/portal", {
    cartNumber: Object.values(freqCounter).reduce((a, b) => a + b),
    freqCounter
  });
};

module.exports.add = async (req, res) => {
  let productId = req.signedCookies.productId;
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let itemsLength = cart ? cart.items.length : 0;
  let product = await Product.findOne({ _id: productId });

  if (cart) {
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      {
        $push: {
          items: {
            productId: productId,
            productName: product.name
          }
        },
        $set: {
          total: 9.99 * parseInt(itemsLength + 1)
        }
      },
      { new: true }
    );
  } else {
    // create new document
    cart = new Cart({
      owner: req.signedCookies.userId,
      items: {
        productId: productId,
        productName: product.name
      },
      total: 9.99
    });

    await cart.save();
  }
  res.redirect("/cart/portal");
};

module.exports.delete = async (req, res) => {
  const cart = await Cart.findOne({ owner: req.signedCookies.userId });
};
