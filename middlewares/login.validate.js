module.exports.auth = (req, res, next) => {
  let errors = [];
  if (!req.body.email) {
    errors.push("Email là bắt buộc!");
  }
  if (!req.body.password) {
    errors.push("Mật khẩu là bắt buộc");
  }
  if (errors.length) {
    res.render("user/login", {
      errors: errors,
      values: req.body
    });
  }
  next();
};
