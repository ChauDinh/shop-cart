require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("views", "./public/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`The server is listening on ${PORT}`));
