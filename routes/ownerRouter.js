const express=require('express');
const router=express.Router();
require('dotenv').config();
const ownerModel=require("../models/owner-model");
const {ownerCreated}=require("../controllers/ownerControllers");


console.log(process.env.NODE_ENV);

// router.post("/create",ownerCreated);

router.get("/",(req,res)=>{
    console.log("owner router");
    res.send("owner router");   
})
if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
       // res.send("owner created");
       try{

        console.log(req.body.email);
        console.log(req.body.password);
        
        let { email, password } = req.body;

        console.log(email);
        console.log(password);

        res.send("owner created");
        let createdOwner=new ownerModel.create({
           
            email,
            password
        });
        res.send(createdOwner);
    }
    catch(err){
        res.send(err.message);
    }

    })
}

router.get("/",(req,res)=>{
    res.send("owner router");
    console.log("owner home page");
});

module.exports=router;