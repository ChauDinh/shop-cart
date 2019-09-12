const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart.controller");
const validate = require("../middlewares/auth.validate");

router.get("/portal", validate.member, controller.portal);
router.get("/empty", validate.member, controller.empty);

router.post("/add", validate.member, controller.add);
router.post("/delete/:name", controller.delete);
router.post("/increment/:name", controller.increment);
router.post("/decrement/:name", controller.decrement);

module.exports = router;
