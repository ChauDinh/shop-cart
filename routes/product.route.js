const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");
const validate = require("../middlewares/product.validate");
const auth = require("../middlewares/auth.validate");

router.get("/", auth.member, controller.index);

router.get("/add", auth.member, controller.create);

router.get("/:id", controller.view);

router.post("/add", validate.add, controller.add);

module.exports = router;
