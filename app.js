require('dotenv').config();
const express=require("express");
const app=express();
const path=require('path');
// const mongoose_connection=require("./config/mongoose_connection"); // path may vary

const db=require("./config/mongoose_connection");
const indexRouter=require("./routes/index");
const usersRouter=require("./routes/userRouter");
const ownersRouter=require("./routes/ownerRouter");
const productsRouter=require("./routes/productRouter");
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine",'ejs');
const sessionSession = require("express-session");
const flash = require("connect-flash");

let count = 1;
// session MUST come before flash
app.use(
  sessionSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,   // move to env in production

  })
);

// flash AFTER session
app.use(flash());// app.set("view engine","ejs");



// app.use((req, res, next) => {
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

console.log("DEBUG =", process.env.DEBUG);
console.log("JWT_SECRET_KEY =", process.env.JWT_SECRET_KEY);
console.log("EXPRESS_SESSION_SECRET =", process.env.EXPRESS_SESSION_SECRET);

app.use("/",indexRouter);
app.use("/users",usersRouter);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);

app.get("/",(req,res)=>{
    res.send("chal raha hai");
})

app.listen(3000);