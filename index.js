const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const ordersRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");
var cors = require("cors");

const port = 5000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/checkout", stripeRoutes);

app.listen(port, () => {
  console.log("server is running", port);
});
