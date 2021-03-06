const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./src/public/assets/uploads/" });
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../middlewares/login.validate");
const register = require("../middlewares/register.validate");
const auth = require("../middlewares/auth.validate");

router.get("/login", controller.login);

router.get("/logout", controller.logout);

router.get("/register", controller.register);

router.get("/:id", auth.member, controller.view);

router.post("/login", validate.auth, controller.auth);

router.post("/register", upload.single("avatar"), register.add, controller.add);

router.post("/update", upload.single("update-avatar"), controller.update);

module.exports = router;
