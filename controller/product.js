const Products = require('../model/product');

const getAllProducts = async(req,res)=>{
  const {featured, company, name, sort, fields} = req.query;
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
  let result = Products.find(QueryObj);
  if(sort){
     const sortList = sort.split(',').join(' ');
     result = result.sort(sortList);
  }
  else{
    result = result.sort('createdAt');
  }
  if(fields){
    const FieldList = fields.split(',').join(' ');
    result = result.select(FieldList);
  }
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page-1)* limit;
  const product = await result.limit(limit).skip(skip);
  res.status(200).json({data: product, nbHTS: product.length})
}

const getAllProductsStatic = async(req,res)=>{
    const product = await Products.find({},{name:1, price:1}).sort({name: 1, price: 1}).limit(10).skip(5)
    res.status(200).json({data:product, nbHTS: product.length});
}

module.exports = {getAllProducts,getAllProductsStatic}