const express=require("express");
const app=express();

app.get("/",function(req,res){
    res.send("chal raha hai");
})

app.listen(3000);