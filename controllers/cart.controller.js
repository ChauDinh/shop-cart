const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports.portal = async (req, res) => {
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let list = [...cart.items];
  let listName = list.map(item => item.productName);
  res.render("cart/portal", {
    cartNumber: cart.items.length,
    listName
  });
};

module.exports.add = async (req, res) => {
  productId = req.signedCookies.productId;
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
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
      total: 1
    });

    await cart.save();
  }
  res.redirect("/cart/portal");
};
