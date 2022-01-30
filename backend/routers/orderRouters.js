import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
const OrderRouter = express.Router();

OrderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (body.req.OrderItems.length===0) {
        return res.status(400).send({
            message: 'Cart is empty'
        });
    }else{
        const order = new Order({
            user: req.user._id,
            OrderItems: req.body.OrderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).send({ message:'New Order Created',order: createdOrder});
    }
}));

export default OrderRouter