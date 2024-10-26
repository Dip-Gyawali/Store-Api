const errorhandler = (err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({message:"Some Error Occured"});
}

module.exports = errorhandler;