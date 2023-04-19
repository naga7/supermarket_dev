const mongoose = require("mongoose")
const product_Schema = mongoose.Schema({
   /* userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }*/
    product_name:{
        type:String,
        trim:true,
        required:true
    },
    product_brand:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
       
    }
    ,
    product_price:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
       
    }
    ,
    product_image:{
        type:String,
       
    },
    product_size:{
        type:String,
      
    }
}, {timestamps:true})


const prouductModel = mongoose.model("product", product_Schema)
module.exports = prouductModel