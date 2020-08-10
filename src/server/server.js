require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const puppeteer = require("puppeteer");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/shop-cart-db",
  {
    useNewUrlParser: true,
  }
);

const app = express();

app.set("view engine", "pug");
app.set("views", "src/public/views");

app.use(express.static("./src/public"));
app.use("/src/public", express.static("./src/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("kimboyune"));

const Product = require("./models/product.model");
const User = require("./models/user.model");
const Cart = require("./models/cart.model");

const mockCategories = [
  "Điện thoại, máy tính bảng",
  "Laptop",
  "Máy ảnh kỹ thuật số",
  "Sách, văn phòng phẩm",
  "Máy đọc sách, Kindle",
  "Thời trang nữ",
  "Thời trang nam",
  "Thời trang trẻ em",
  "Gaming gear",
  "Trang trí nội thất",
];

app.get("/", async (req, res) => {
  const products = await Product.find().sort({ created_at: -1 });
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  const cart = await Cart.findOne({ owner: userId });

  res.render("index", {
    products: products,
    categories: mockCategories,
    userId: userId,
    user: user,
    path: req.signedCookies.avatar,
    cartNumber: cart ? cart.items.length : "",
    // getArticles: getArticles
  });
});

app.get("/search", async (req, res) => {
  let q = req.query.q;
  const userId = req.signedCookies.userId;
  const user = await User.findOne({ _id: userId });
  const cart = await Cart.findOne({ owner: userId });
  const matchedProducts = await Product.find({
    categories: {
      $in: [`${q}`],
    },
  });

  res.render("search", {
    categories: mockCategories,
    products: matchedProducts,
    value: q,
    user: user,
    path: user ? user.avatar : "",
    query: q,
    cartNumber: cart ? cart.items.length : "",
  });
});

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

app.listen(8080, () => console.log(`The server is listening on 8080`));
