require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "pug");
app.set("views", "public/views");

app.use(express.static("./"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

const Product = require("./models/product.model");
const User = require("./models/user.model");
const Cart = require("./models/cart.model");

app.get("/", async (req, res) => {
  const products = await Product.find().sort({ created_at: -1 });
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  const cart = await Cart.findOne({ owner: userId });
  // Get dữ liệu từ freecodecamp/news
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.freecodecamp.org/news/");

  // Script dùng để craw dữ liệu vào biến articles và images
  const getArticles = await page.evaluate(() => {
    let titleLinks = document.querySelectorAll(".post-card-title");
    let imageLinks = document.querySelectorAll(".post-card-image");
    titleLinks = [...titleLinks];
    imageLinks = [...imageLinks];
    let articles = titleLinks.map(link => ({
      title: link.innerText,
      url: link.getElementsByTagName("a")[0].href
    }));
    let images = imageLinks.map(image => ({
      image:
        image.getAttribute("src").indexOf("https") !== -1
          ? `${image.getAttribute("src")}`
          : `https://freecodecamp.org${image.getAttribute("src")}`
    }));
    return {
      articles,
      images
    };
  });
  await browser.close();

  res.render("index", {
    products: products,
    userId: userId,
    user: user,
    path: req.signedCookies.avatar,
    cartNumber: cart ? cart.items.length : "",
    getArticles: getArticles
  });
});

app.get("/search", async (req, res) => {
  let q = req.query.q;
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  const cart = await Cart.findOne({ owner: userId });
  const matchedProducts = await Product.find({
    categories: {
      $in: [`${q}`]
    }
  });

  console.log(matchedProducts);
  res.render("index", {
    products: matchedProducts,
    value: q,
    user: user,
    path: user ? user.avatar : "",
    query: q,
    cartNumber: cart ? cart.items.length : ""
  });
});

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => console.log(`The server is listening on ${PORT}`));
