require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./model/product");
const datas = require("./products.json");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connection Established"))
  .then(() => products.deleteMany())
  .then(() => {
    products.create(datas);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1)
  });
