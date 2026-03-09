const express=require('express');
const router=express.Router();
// require('dotenv').config();
const ownerModel=require("../models/owner-model");
const {isLoggedIn}=require("../middlewares/isLoggedIn")


router.get("/",(req,res)=>{
    console.log("owner router");
    res.send("owner router");   
})
if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        let owner=await ownerModel.find();
        // if(owner.length>0) return res.status(503).send("owner already exists");
        let { fullname,email, password } = req.body;
        //console.log(fullname);
        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password,
        });
        
        res.send(createdOwner);


    })
}

// router.get("/products",function(req,res){

//     res.render("products");
// });

router.get("/admin",isLoggedIn,function(req,res){
    let success=req.flash("success");
    let error=req.flash("error");
    let panel="Admin";
    res.render("createProduct",{panel,error,success});
});


module.exports=router;