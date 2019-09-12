"use strict";

module.exports.add = async (req, res, next) => {
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

  next();
};