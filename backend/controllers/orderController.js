import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// desc : add an order
// route : Post /api/orders
// access : private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = req.body;
  if(orderItems && orderItems.length == 0){
      res.status(400)
      throw new Error("No Order Items")
      return
  }else{
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
        itemsPrice,
      })
      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
  }
});

export {addOrderItems}