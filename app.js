const express=require("express");
const app=express();
const path=require('path');
const indexRouter=require("./routes/index");
const usersRouter=require("./routes/userRouter");
const ownersRouter=require("./routes/ownerRouter");
const productsRouter=require("./routes/productRouter");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine",'ejs');


app.use("/",indexRouter);
app.use("/users",usersRouter);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);

app.listen(3000);