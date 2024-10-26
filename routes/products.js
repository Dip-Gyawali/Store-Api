const express = require('express');
const {getAllProducts,getAllProductsStatic} = require('../controller/product');
const routes = express.Router();

routes.get('/',getAllProducts);
routes.get('/static',getAllProductsStatic);

module.exports = routes