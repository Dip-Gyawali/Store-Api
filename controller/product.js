const Products = require('../model/product');

const getAllProducts = async(req,res)=>{
  const {featured, company, name, sort, fields, NumericFilter} = req.query;
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
  if(NumericFilter){
    const OperatorMap ={
      '>':"$gt",
      '>=':"$gte",
      '=':"$eq",
      '<':"$lt",
      '<=':"$lte",
    }
    const regEx = /\b(<|<=|=|>|>=)\b/g;
    let filter = NumericFilter.replace(regEx,(match)=> `-${OperatorMap[match]}-`);
    const values = ['price','rating'];
    filter = filter.split(',').forEach((item)=>{
      const [fieldName,methods,value] = item.split('-');
      if(values.includes(fieldName)){
        QueryObj[fieldName] = {[methods]:value}
      }
    })

    console.log(QueryObj);
  }
  console.log(QueryObj)
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
    const product = await Products.find({price:{$gt:100}},{name:1, price:1}).sort({name: 1, price: 1}).limit(10).skip(5)
    res.status(200).json({data:product, nbHTS: product.length});
}

module.exports = {getAllProducts,getAllProductsStatic}