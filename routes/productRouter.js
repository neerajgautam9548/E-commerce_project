const express=require("express");
const router=express.Router();
const productModel=require("../models/product-model");
const upload=require("../config/multer");
const multer=require("multer");

// router.get("/",(req,res)=>{
//     console.log("user product page");
//     res.send("user product page");
// });

// router.get("/",async (req,res)=>{
//     let error=req.flash("error");
//     let success=req.flash("success");
//     let panel="Product"
//     res.render("createProduct",{error,success,panel});
// })



router.post("/create", upload.single("image") ,async (req,res)=>{
    console.log("chal raha hai");
    
    try{
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
        const product = await productModel.create({
            image:req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        console.log(product);
        req.flash("success","Product Created Successfully");
        return res.redirect("/owners/admin");
    }catch(err){
        req.flash("error","Something Went Wrong");
        return res.redirect("/owners/admin");
    }
});



module.exports=router;