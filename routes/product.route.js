const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");
const validate = require("../middlewares/product.validate");
const auth = require("../middlewares/auth.validate");

router.get("/", auth.guess, auth.member, controller.index);

router.get("/add", auth.guess, auth.member, controller.create);

router.get("/:id", auth.guess, controller.view);

router.post("/add", validate.add, controller.add);

module.exports = router;
