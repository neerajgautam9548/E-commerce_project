const userModel=require("../models/user-model");
const jwt=require("jsonwebtoken");

module.exports.isLoggedIn=async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","User have not permission")
        return res.redirect("/");
    }
    try{
        let decoded=await jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY)
        let user=await userModel
        .findOne({email:decoded.email})
        .select("-password");
        req.user=user;
        next();
    }catch(err){
        req.flash("error","Something Went Wrong");
        return redirect("/");
    }

}