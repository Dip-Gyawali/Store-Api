const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
      type:String,
      required:[true,'product name is needed']
    },
    price:{
        type:Number,
        required:[true,"price is needed"]
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    company:{
        type:String,
        //enum is used to only accept the data specified in value
        enum:{
            values:["ikea","liddy","caressa",'marcos'],
            //{VAlUE} gives the name entered by user
            message:'{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product',productSchema);