const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", controller.index);

router.get("/add", controller.create);

router.get("/:id", controller.view);

router.post("/add", controller.add);

module.exports = router;
