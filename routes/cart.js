const express = require("express");
const router = express.Router();
const { cartModel, validateCart } = require("../model/cart");
const {validateAdmin, userIsLoggedin} = require("../middlewares/admin");
const { productModel } = require("../model/product");

router.get("/",userIsLoggedin, async function(req,res){
 try {
    let cart = await cartModel.findOne({ user: req.session.passport.user })
    .populate("products");

    let cartDataStructure  = {};
    cart.products.forEach(product => {
      let key = product._id.toString();
      if(cartDataStructure[key]){
           cartDataStructure[key].quantity += 1;
      }else{
         cartDataStructure[key] = {
            ...product._doc,
            quantity:1,
         };
      }
    })
    let finalarray = Object.values(cartDataStructure);

    let finalprice = cart.totalPrice + 34 ;

    res.render("cart", { cart: finalarray , finalprice: finalprice, userid: req.session.passport.user});
   //  res.render("cart", {cart});
 } catch (err) {
    res.send(err.message);
 }
});
router.get("/add/:id",userIsLoggedin, async function(req,res){
 try {
    let cart = await cartModel.findOne({ user: req.session.passport.user });
   //  let product = await productModel.find({ _id: req.params.id });
    let product = await productModel.findById(req.params.id);

    if(!cart){
         cart = await cartModel.create({
         user:req.session.passport.user, 
         products:[req.params.id],
         totalPrice: Number(product.price ),  
        });
    }else{
      if (!Array.isArray(cart.products)) cart.products = [];
        cart.products.push(req.params.id);
        cart.totalPrice = Number(cart.totalPrice) + Number(product.price);

        await cart.save();
    }
    res.redirect("/cart");
 } catch (err) {
    res.send(err.message);
 }
});
router.get("/remove/:id",userIsLoggedin, async function(req,res){
 try {
    let cart = await cartModel.findOne({ user: req.session.passport.user });
   //  let product = await productModel.find({ _id: req.params.id });
    let product = await productModel.findById(req.params.id);

    if(!cart){
         res.send("there is nothing cart")
    }
   // }else{
   //    // if (!Array.isArray(cart.products)) cart.products = [];
   //    let prodId = cart.products.indexOf(req.params.id);
   //      cart.products.splice(prodId, 1);
   //      cart.totalPrice = Number(cart.totalPrice) + Number(product.price);

   //      await cart.save();
   //  }

   let index = cart.products.indexOf(req.params.id);
   if(index !== -1) 
      {
         cart.products.splice(index, 1);
   cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
   await cart.save();
      }
    res.redirect("/cart");
 } catch (err) {
    res.send(err.message);
 }
});

router.get("/remove/:id", userIsLoggedin, async function (req,res) {
   try {
     let cart = await cartModel.findOne({user: req.session.passport.user});
     if(!cart) return res.send("Something went wrong");
     let index = cart.products.indexOf(req.params.id);
     if(index !== -1) cart.products.splice(index, 1);
     else return res.send("item remove successfully");
 
     await cart.save();
     res.redirect("/cart");
   } catch (err) {
     res.send(err.message);
   }
})

module.exports = router;