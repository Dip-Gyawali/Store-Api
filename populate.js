require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./model/product");
const datas = require("./products.json");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connection Established"))
  .then(() => products.deleteMany())
  .then(() => {
    console.log("Adding Data to database")
    return products.create(datas);
  })
  .then((result)=>{
    console.log(`Added ${result.length} products successfully`);
    mongoose.connection.close();
    process.exit(0)
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
    process.exit(1)
  });
