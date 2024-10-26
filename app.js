const express = require('express');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const mongoose = require('mongoose');
const productRouters = require('./routes/products');
const errorhandler = require('./middleware/error-handler');
require('express-async-errors');
const app = express();

app.use(express.json());

//connect to database
mongoose.connect(process.env.DB_URI).then(()=> console.log('Connected To Database')).catch((err)=> console.log(err));

//routes
app.get('/',(req,res)=>{
    res.send("<h1>Store API</h1><a href='/api/v1/products'>Products</a>")
})

app.use('/api/v1/products',productRouters);

//middleware
app.use(notFound);
app.use(errorhandler);


app.listen(process.env.PORT,()=>{
    console.log(`Listening to Port ${process.env.PORT}`);
});