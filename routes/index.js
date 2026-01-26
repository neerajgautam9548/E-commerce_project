const express=require("express");
const router=express.Router();

router.get("/",function(req,res){
    res.render("index");
})

router.get("/shop",function(req,res){
    res.render("shop");
})

router.get("/createProduct",function(req,res){
    res.render("createProduct");

})

router.get("/cart",(req,res)=>{
    res.render("cart");
})

module.exports=router;