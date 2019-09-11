const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

module.exports.portal = async (req, res) => {
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  if (!cart || cart.items.length === 0) {
    res.redirect("/cart/empty");
  }
  let list = [...cart.items];
  let listName = list.map(item => item.productName);
  let freqCounterName = {};
  for (let el of listName) {
    freqCounterName[el] = (freqCounterName[el] || 0) + 1;
  }
  res.render("cart/portal", {
    cartNumber: Object.values(freqCounterName).reduce((a, b) => a + b),
    freqCounterName
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

module.exports.decrement = async (req, res) => {
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let items = [...cart.items];
  let itemsName = items.map(item => item.productName);
  let index = itemsName.indexOf(Object.keys(req.body)[0]);
  items.splice(index, 1);
  await Cart.findOneAndUpdate(
    { _id: cart._id },
    {
      $set: {
        items: items
      }
    }
  );
  res.redirect("/cart/portal");
};

module.exports.increment = async (req, res) => {
  // let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let product = await Product.findOne({ name: Object.keys(req.body)[0] });
  await Cart.findOneAndUpdate(
    { owner: req.signedCookies.userId },
    {
      $push: {
        items: {
          productId: product._id,
          productName: product.name
        }
      }
    }
  );
  res.redirect("/cart/portal");
};

module.exports.delete = async (req, res) => {
  let cart = await Cart.findOne({ owner: req.signedCookies.userId });
  let items = [...cart.items];
  let removeItems = items.filter(
    item => item.productName !== Object.keys(req.body)[0]
  );
  await Cart.findOneAndUpdate(
    { owner: req.signedCookies.userId },
    {
      $set: {
        items: removeItems
      }
    }
  );
  res.redirect("/cart/portal");
};

module.exports.empty = (req, res) => {
  res.render("cart/empty");
};
