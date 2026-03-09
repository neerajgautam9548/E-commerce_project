let userModel = require("../models/user-model");
require("dotenv").config();
let bcrypt = require("bcrypt");
let cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// require("../config/keys");
const {generateToken} = require("../utils/generateToken");


module.exports.userRegister = async (req, res) => {
    try {

        let { fullname, email, password } = req.body;
        let users = await userModel.findOne({ email });

        if (users) {
            req.flash("error", "user already exists");
            return res.redirect("/");
        }
        bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.status(503).send(err.message);
                    
                }
                let createdUser = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });
                // let token=jwt.sign({email:email,id:createdUser._id},process.env.JWT_SECRET_KEY);
                let token = generateToken(createdUser);
                res.cookie("token", token);
                // console.log(token);
                req.flash("error","user registered successfully");
                return res.redirect("/");
            })
        })
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.userlogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(email);
        console.log(password);
        
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error","This Email is not registered");
            return res.redirect("/");

        }
        bcrypt.compare(password, user.password, function (err, result) {

            if (!result) {
                req.flash("error","password is incorrect");
                return res.redirect("/");
            }
            let token = generateToken(user);
            res.cookie("token", token);
            req.flash("success","login successfully");
            res.redirect("/shop");
        });

    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.userlogout=function(req,res){
    res.cookie("token","");
    req.flash("success","Logout successfully");
    res.redirect("/");
}
