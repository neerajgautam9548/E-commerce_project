const express=require("express");
const router=express.Router();
let {userRegister,userlogin,userlogout}=require("../controllers/authControllers");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");


// const products = {
//   101: { name: "Shirt", count: 1 },
//   102: { name: "Shoes", count: 1 }
// };

// router.get("/",(req,res)=>{
//     res.send("user page");
//     console.log("user page");
// });

// router.get("/",function(req,res){
//     // let error=req.flash("error");

//     // res.render("index",{error});  
//     res.send("chal raha hai");
// });
let count=1;
// router.get("/cart", isLoggedIn, async (req, res) => {

//   let user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("cart");

//   let platformFee = 20;
//   let shippingFee = 0;
//   let grandTotal = 0;
//   let totalPrice=0;

//   // 🔍 Debug once (optional)
//   console.log(
//   user.cart.map(p => ({
//       id: p._id,
//       hasImage: !!p.image,
//       imageType: p.image ? p.image.constructor.name : null
//     }))
//   );

//   user.cart = user.cart.map(product => {

//     let discountAmount = (product.price * product.discount) / 100;
//     let priceAfterDiscount = product.price - discountAmount;
//     let totalPrice = priceAfterDiscount + platformFee + shippingFee;

//     grandTotal += totalPrice;

//     return {
//       ...product._doc,
//       discountAmount,
//       priceAfterDiscount,
//       totalPrice
//       // image is already inside product._doc
//     };
//   });

//   res.render("cart", {
//     count,
//     user,
//     success: req.flash("success"),
//     error: req.flash("error"),
//     panel: "Cart",
//     grandTotal,totalPrice
//   });
// });

// router.get("/cart",isLoggedIn,async (req,res)=>{
   
//     let user=await userModel.findOne({email:req.user.email}).populate("cart");
//     let success=req.flash("success");
//     let error=req.flash("error");    
//     let panel="Cart";
//     let platformFee = 20;
//     let shippingFee = 0;
//     let grandTotal = 0;
//     let totalPrice=0
//     // let image;
//     user.cart.map(p=>({
//         id: p._id,
//         hasImage: !!p.image,
//         imageType: typeof p.image
//     }))
//     // user.cart = user.cart.map(product => {
//     //   let image=product.image;
//     //   let discountAmount = (product.price * product.discount) / 100;
//     //   let priceAfterDiscount = product.price - discountAmount;

//     //   totalPrice = priceAfterDiscount + platformFee + shippingFee;

//     //   grandTotal += totalPrice;

//     //   // console.log(image);
//     //   return {
//     //     ...product._doc,

//     //     discountAmount,
//     //     // image,
//     //     priceAfterDiscount,
//     //     totalPrice
//     //   };
//     // });
//     res.render("cart",{count,user,success,error,panel,totalPrice,grandTotal});
// });

// router.get("/cart", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("cart.product");

//   const platformFee = 20;
//   const shippingFee = 0;
//   const totalMRP=0;
//   const totalDiscount=0;
//   user.cart = user.cart
//   .filter(item => item.product) // ✅ remove broken items
//   .map(item => {
//     const p = item.product;
//     const qty = item.quantity;

//     const discountAmount = (p.price * p.discount) / 100;
//     const priceAfterDiscount = p.price - discountAmount;

//     totalMRP += p.price * qty;
//     totalDiscount += discountAmount * qty;

//     return {
//       ...item,
//       priceAfterDiscount,
//       itemTotal: priceAfterDiscount * qty
//     };
//   });

//   const totalPrice =
//     totalMRP - totalDiscount + platformFee + shippingFee;
//   let success=req.flash("success");
//   let error=req.flash("error");
//   let panel="Cart"
//   res.render("cart", {
//     success,
//     error,
//     panel,
//     user,
//     totalMRP,
//     totalDiscount,
//     platformFee,
//     shippingFee,
//     totalPrice
//   });
// });

// router.get("/add/:id", isLoggedIn, async (req, res) => {
//   const user = await userModel.findOne({ email: req.user.email });

//   const item = user.cart.find(
//     i => i.product.toString() === req.params.id
//   );

//   if (item) item.quantity += 1;

//   await user.save();
//   res.redirect("/users/cart");
// });

// router.get("/subtract/:id", isLoggedIn, async (req, res) => {
//   const user = await userModel.findOne({ email: req.user.email });

//   const item = user.cart.find(
//     i => i.product.toString() === req.params.id
//   );

//   if (item) {
//     item.quantity -= 1;
//     if (item.quantity <= 0) {
//       user.cart = user.cart.filter(
//         i => i.product.toString() !== req.params.id
//       );
//     }
//   }

//   await user.save();
//   res.redirect("/users/cart");
// });

router.get("/add/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  // ✅ clean invalid items
  user.cart = user.cart.filter(i => i.product);

  const item = user.cart.find(
    i => i.product.toString() === req.params.id
  );

  if (item) {
    item.quantity += 1;
  }

  await user.save();
  res.redirect("/users/cart");
});
router.get("/subtract/:id", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  // ✅ clean invalid items
  user.cart = user.cart.filter(i => i.product);

  const item = user.cart.find(
    i => i.product.toString() === req.params.id
  );

  if (item) {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      user.cart = user.cart.filter(
        i => i.product.toString() !== req.params.id
      );
    }
  }

  await user.save();
  res.redirect("/users/cart");
});
// router.get("/cart", isLoggedIn, async (req, res) => {
//   const user = await userModel
//     .findOne({ email: req.user.email })
//     .populate("cart.product");

//   const platformFee = 20;
//   const shippingFee = 0;
//   let totalMRP = 0;
//   let totalDiscount = 0;
//   let discountAmount=0
//   //let priceAfterDiscount=0;

//   user.cart = user.cart
//     .filter(item => item.product)
//     .map(item => {
//       const p = item.product;
//       const qty = item.quantity;

//       const discountAmount = (p.price * p.discount) / 100;
//       const priceAfterDiscount = p.price - discountAmount;

//       totalMRP += p.price * qty;
//       totalDiscount += discountAmount * qty;

//       return {
//         ...item,
//         discountAmount,
//         priceAfterDiscount,
//         itemTotal: priceAfterDiscount * qty
//       };
//     });

//   const totalPrice =
//     totalMRP - totalDiscount + platformFee + shippingFee;

//   res.render("cart", {
//     success: req.flash("success"),
//     error: req.flash("error"),
//     panel: "Cart",
//     user,
//     totalMRP,
//     totalDiscount,
//     platformFee,
//     shippingFee,
//     totalPrice
//   });
// });




// router.get("/cart/:id",isLoggedIn,async (req,res)=>{
//     // let {price,discount}=req.body;
//     console.log("chal raha hai")
//     let product=await productModel.findOne({id:req.params._id});
//     let user=await userModel.findOne({email:req.user.email}).populate("cart");
//     console.log("product display");

//     let price=product.price;
//     let discount=product.discount; 
//     console.log(price+" "+discount);
//     let DOMRP=(price*discount)/100; //discount On MRP
//     let PAD=price-DOMRP; // price after discount
//     let PF= 20;
//     let TotalPrice= PAD + PF // total fees
//     res.redirect("/users/cart",{TotalPrice});
    
// });

// router.get("/removecart/:id",async (req,res) => {
//   console.log("chal raha hai");
//     let product=await userModel.findOne({id:req.params.id}).populate("cart");
//     let user=productModel.findOneAndDelete({id:req.params.id}).populate("product");
//     console.log(user);

//     res.redirect("/users/cart");
// })

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart.product");

  const platformFee = 20;
  const shippingFee = 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  //let priceAfterDiscount=0;

  // user.cart = user.cart
  //   .filter(item => item.product)
  //   .map(item => {
  //     const p = item.product;
  //     const qty = item.quantity;

  //     const discountAmount = (p.price * p.discount) / 100;
  //     const priceAfterDiscount = p.price - discountAmount;

  //     totalMRP += p.price * qty;
  //     totalDiscount += discountAmount * qty;

  //     return {
  //       ...item,
  //       discountAmount,          // ✅ per-item discount
  //       priceAfterDiscount,      // ✅ per-item discounted price
  //       itemTotal: priceAfterDiscount * qty
  //     };
  //   });

  const totalPrice =
    totalMRP - totalDiscount + platformFee + shippingFee;

  res.render("cart", {
    success: req.flash("success"),
    error: req.flash("error"),
    panel: "Cart",
    user,
    totalMRP,
    totalDiscount,
    platformFee,
    shippingFee,
    totalPrice
  });
});

router.get("/removecart/:id",isLoggedIn, async (req, res) => {
  try {
    console.log("remove cart chal raha hai");
    // userModel.findOne(req.user.id);
    await userModel.findByIdAndUpdate(
      req.user._id,                 // ✅ logged-in user
      {
        $pull: {
          cart: {
            product: req.params.id       // ✅ productId remove

          }
          
        }
      }
    );
    req.flash("success","Product removed Successfully");
    res.redirect("/users/cart");
  } catch (err) {
    console.log(err);
    res.redirect("/users/cart");
  }
});


router.get("/add/:id",async (req, res) => {
  const productId = req.params.id;
  let product=await productModel.findOne({id:req.params.id});
  console.log("chal raha hai")
 // product.count+=1;
  // console.log(product.count);
  res.redirect("/users/cart"); // re-render page
});

// DECREMENT
router.get("/subtract/:id", (req, res) => {
  const productId = req.params.id;

  // products = products.map(product =>
  //   product.id === productId && product.count > 1
  //     ? { ...product, count: product.count - 1 }
  //     : product
  res.redirect("/users/cart");
});

router.get("/profile",isLoggedIn,async (req,res)=>{
  let user=await userModel.findOne({email:req.user.email})
  let success=req.flash("success");
  let error=req.flash("error");
  let panel="Profiler";
  res.render("profile",{success,error,panel,user});
});


router.post("/register",userRegister);
router.post("/login",userlogin);
router.get("/logout",userlogout);


module.exports=router;