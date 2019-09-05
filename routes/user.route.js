const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../middlewares/login.validate");
const auth = require("../middlewares/auth.validate");

router.get("/login", controller.login);

router.get("/register", controller.register);

router.get("/:id", auth.member, controller.view);

router.post("/login", validate.auth, controller.auth);

router.post("/register", controller.add);

module.exports = router;
