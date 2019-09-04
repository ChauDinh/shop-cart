const User = require("../models/user.model");

module.exports.register = (req, res) => {
  console.log(req.cookies);
  res.render("user/register");
};

module.exports.login = (req, res) => {
  res.render("user/login");
};

module.exports.view = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({ _id: id });
  res.render("user/view", {
    user: user
  });
};

module.exports.add = async (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  await user.save();
  res.redirect("/users/login");
};

module.exports.auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.render("user/login", {
      errors: ["User does not exist!"],
      values: req.body
    });
    return;
  }

  if (user.password !== password) {
    res.render("user/login", {
      errors: ["Oops! Something went wrong!"],
      values: req.body
    });
    return;
  }

  res.cookie("userId", user._id);
  res.cookie("username", user.username);

  res.redirect("/");
};
