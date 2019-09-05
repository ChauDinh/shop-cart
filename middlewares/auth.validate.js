const User = require("../models/user.model");

module.exports.member = async (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/users/login");
    return;
  }

  const user = await User.findOne({ _id: req.signedCookies.userId });
  if (!user) {
    res.redirect("/users/login");
    return;
  }

  next();
};
