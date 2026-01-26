// const mongoose=require("mongoose");
// const config=require("config");
// const db=require("debug")("development:mongoose");

// mongoose
//     .connect(`${config.get("MONGODB_URI")}/scatch_1`)
//     .then(function(){
//         console.log("connected");
//         db("connected");
//     })
//     .catch(function(err){
//         console.log(err);
//         db(err);
//     })

// module.exports=mongoose.connection;

const mongoose=require("mongoose");
const config=require("config");
const db=require("debug")("development:mongoose");


mongoose.connect(`${config.get("mongodb_uri")}/scatch_1`)
    .then(function(){
        console.log("mongoose connected");
        db("mongoose connected");
    })
    .catch(function(err){
        db(err);
    })

module.exports=mongoose.connection;