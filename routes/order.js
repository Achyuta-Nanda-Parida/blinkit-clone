const express = require("express");
const { paymentModel } = require("../model/payment");
const { orderModel } = require("../model/order");
const { cartModel } = require("../model/cart");
const route = express.Router();

route.get("/:userid/:orderid/:paymentid/:signature", async function(req,res){
   let paymentDetails = await paymentModel.findOne({ 
    orderId: req.params.orderid
 });
if(!paymentModel) return res.send("Sorry, payment not completed");
if(
    req.params.signature === paymentDetails.signature && 
    req.params.paymentid === paymentDetails.paymentId
){

    let cart = await cartModel.findOne({ user: req.params.userid });



//    await orderModel.create({
//         orderId: req.params.orderid,
//            user: req.params.userid,
//         //    products: cart.products,
//          products: cart.products.map(p => p.productId),
//            totalPrice: cart.totalPrice,
//            status: "processing",
//            delivery: "Home Delivery",
//            payment: paymentDetails._id,
//            address: req.body.address,
//     });

await orderModel.create({
  orderId: req.params.orderid,
  user: req.params.userid,
  products: cart.products.map(p => p.productId),  // make sure p.product actually contains an ObjectId
  totalPrice: cart.totalPrice,
//   address: req.body.address, // or any valid address string
  status: "processing",
  payment: paymentDetails._id,
  delivery: "Home Delivery"
});

    res.redirect(`/map/${req.params.orderid}`);
}
else{
    res.send("Invalide payment");
    
}
});
route.post("/address/:orderid", async function(req,res){
   let order = await orderModel.findOne({orderId: req.params.orderid});
   if(!order) return res.send("Sorry, This order does not exist");
   if(!req.body.address) return res.send("You must be provide an address");
   order.address = req.body.address;
   order.save();
   res.redirect("/");
});
module.exports = route;