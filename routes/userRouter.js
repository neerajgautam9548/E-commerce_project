const express=require("express");
const router=express.Router();
let {userRegister,userlogin,userlogout}=require("../controllers/authControllers");

router.get("/",(req,res)=>{
    res.send("user home page");
    console.log("user home page");
});

router.post("/register",userRegister);
router.post("/login",userlogin);
router.get("/logout",userlogout);


module.exports=router;