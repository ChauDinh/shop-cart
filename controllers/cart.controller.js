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
  let productId = req.signedCookies.productId;
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let items = cart
    ? cart.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        number: item.number
      }))
    : "";
  let itemsId = items ? items.map(item => item.productId) : "";
  let itemsNumber = items ? items.map(item => item.number) : "";
  let isExist = items ? itemsId.includes(productId) : false;
  let indexOfItemsId = isExist ? itemsId.indexOf(productId) : 0;
  let itemsLength = cart ? cart.items.length : 0;
  let product = await Product.findOne({ _id: productId });

  if (cart) {
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      isExist
        ? {
            $set: {
              items: {
                productId: productId,
                productName: product.name,
                number: itemsNumber[indexOfItemsId] + 1
              }
            }
          }
        : {
            $push: {
              items: {
                productId: productId,
                productName: product.name,
                number: 1
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
        productName: product.name,
        number: 1
      },
      total: 9.99
    });

    await cart.save();
  }
  res.redirect("/cart/portal");
};
