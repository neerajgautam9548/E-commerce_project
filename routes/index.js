const express=require("express");
const router=express.Router();
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/", function (req, res) {
  let error = req.flash("error");
  let success=req.flash("success");
  let header=req.flash("header");
  let panel="login";

  res.render("index", { error,success,header,panel});
});

// router.get("/users/logout", function (req, res) {
// //   let error = req.flash("error");
// //   let success=req.flash("success");
//     req.flash("success","Logout successfully");
//     let header=true;
//   res.redirect("/",{header});
// });

// router.get("/", function(req, res){
//     let error=req.flash("error");
//     console.log(error);
//     res.render("index",{error}); // error is already in res.locals
// });

// router.get("/", function(req, res){
//     let error=req.flash("error");
//     console.log(error);
//     res.render("index",{error}); // error is already in res.locals
// });

// router.get("/index",function(req,res){
//    let error =req.flash("error");
//            // req.flash("success","product add to cart");
//            //console.log(req.flash("success"));
//     res.render("index",{error});

// // })
// router.post("/create",async (req,res)=>{
//     req.flash("success","Product Created Successfully");
//     return res.redirect("/owners/admin");
// })

router.get("/shop",isLoggedIn,async (req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success");
    let error=req.flash("error");    
    console.log(success);
    let panel="Products"
    res.render("shop",{products,error,success,panel});
})
// router.get("/addtocart/:id",isLoggedIn,async (req,res)=>{
// //  console.log('chal raha hai');
//   let user=await userModel.findOne({email:req.user.email});
//   //console.log(req.params.id);
//   let {id}=req.params.id;
//   let product = await productModel.findOne({id});
//   if(!product){
//     req.flash("error","product not found");
//     // user.cart.push()
//     res.redirect("/users/cart");
//   }  
//   console.log(product);
//   user.cart.push(product._id);

//   await user.save();
//   req.flash("success","Product Successfully add to cart")
//   return res.redirect("/users/cart");
// })

// router.get("/addtocart/:id", isLoggedIn, async (req, res) => {

//   let user = await userModel.findOne({ email: req.user.email });

//   // ✅ find product by MongoDB _id
//   let product = await productModel.findById(req.params.id);

//   if (!product) {
//     req.flash("error", "Product not found");
//     return res.redirect("/users/cart"); // ✅ stop execution
//   }

//   // ✅ push only ObjectId
//   user.cart.push(product._id);
//   // console.log(user.cart.push(product._id));
//   await user.save();

//   req.flash("success", "Product successfully added to cart");
//   return res.redirect("/users/cart");
// });
// router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("cart.product");

//   const productId = req.params.id;

//   const cartItem = user.cart.find(
//     item =>
//       item.product &&
//       item.product._id.toString() === productId
//   );

//   if (cartItem) {
//     cartItem.quantity += 1;
//   } else {
//     user.cart.push({ product: productId, quantity: 1 });
//   }

//   await user.save();
//   req.flash("success", "Product added to cart");
//   res.redirect("/users/cart");
// });

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart.product");

  // ✅ REMOVE invalid cart items first
  user.cart = user.cart.filter(item => item.product);

  const productId = req.params.id;

  const cartItem = user.cart.find(
    item => item.product._id.toString() === productId
  );

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    user.cart.push({ product: productId, quantity: 1 });
  }

  await user.save();
  req.flash("success", "Product added to cart");
  res.redirect("/users/cart");
});


// router.get("/add/:id", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("cart.product");
//   console.log("char raha hai")
//   const item = user.cart.find(
//     i => i.product && i.product._id.toString() === req.params.id
//   );

//   if (item) {
//     item.quantity += 1;
//   }

//   await user.save();
//   res.redirect("/cart");
// });






module.exports=router;