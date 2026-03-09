const mongoose=require("mongoose");

let productModel=mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    count:{
        type:Number,
        default:1,
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String
})

module.exports=mongoose.model("product",productModel);