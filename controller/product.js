const getAllProducts = async(req,res)=>{
  res.status(200).json({message:"Products Route"})
}

const getAllProductsStatic = async(req,res)=>{
    // throw new Error("Async error");
    res.status(200).json({message:"Products Test Routes"});
}

module.exports = {getAllProducts,getAllProductsStatic}