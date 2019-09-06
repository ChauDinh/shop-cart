require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "./public/views");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

const Product = require("./models/product.model");
const User = require("./models/user.model");

app.get("/", async (req, res) => {
  const products = await Product.find();
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  res.render("index", {
    products: products,
    userId: userId,
    user: user,
    path: req.signedCookies.avatar
  });
});

app.get("/search", async (req, res) => {
  let q = req.query.q;
  const products = await Product.find();
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  let matchedProducts = products.filter(
    product => product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
  );
  res.render("index", {
    products: matchedProducts,
    value: q,
    user: user,
    path: user.avatar
  });
});

app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(PORT, () => console.log(`The server is listening on ${PORT}`));
