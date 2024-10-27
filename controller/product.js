const Products = require('../model/product');


const getAllProducts = async(req,res)=>{
  const {featured, company, name} = req.query;
  const QueryObj = {}

  if(featured){
    QueryObj.featured = featured === true?"true":"false"
  }
  if(company){
    QueryObj.company = company
  }
  if(name){
    QueryObj.name= {$regex:name, $options:'i'}
  }
  const product = await Products.find(QueryObj);
  res.status(200).json({data: product, nbHTS: product.length})
}

const getAllProductsStatic = async(req,res)=>{
    // throw new Error("Async error");
    const search ='a';
    const product = await Products.find({name:{$regex:search, $options:'i'}});
    res.status(200).json({data:product, nbHTS: product.length});
}

module.exports = {getAllProducts,getAllProductsStatic}