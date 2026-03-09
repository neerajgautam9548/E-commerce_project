const mongoose = require("mongoose");
const config=require("config");
// require("dotenv").config();
const db=require("debug")("development:mongoose");
mongoose
    .connect(`${config.get("mongodb_uri")}/scatch_1`)
    .then(function(){
        console.log("mongoose connected");
        db("mongoose connected");
    })
    .catch(function(err) {
        // console.log("mongoose connection error",err);
        db(err);
    });

module.exports = mongoose.connection;
