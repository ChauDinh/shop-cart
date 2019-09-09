const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart.controller");
const validate = require("../middlewares/auth.validate");

router.get("/portal", validate.member, controller.portal);
router.post("/add", validate.member, controller.add);

module.exports = router;
