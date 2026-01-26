let userModel = require("../models/user-model");

// const userModel=requrie("../models/user-model");
module.exports.userRegister=async (req,res)=>{
    let {fullname,email,password}=req.body;
    let createdUser=new userModel.create({
        fullname,
        email,
        password
    });
    await userModel.save();
    res.send(createdUser);

    console.log('user register controller');
}
const userlogin=function(req,res){
    res.send(req.body);
    res.send("user login controller");
    //return res.send("user login controller");
}

module.exports.userlogin=userlogin;

const userlogout=function(req,res){
    res.send("user logout successfully");
    return console.log("user logout successfully");
}
module.exports.userlogout=userlogout;
