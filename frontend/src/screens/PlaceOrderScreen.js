import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {
    const toPrice = price => Number(price.toFixed(2));
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod){
        props.history.push("/payment");
    }
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0));
    cart.shippingPrice  = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice  = toPrice(cart.itemsPrice * 0.15);
    cart.totalPrice  = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {};

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName}<br/>
                                    <strong>Address:</strong> {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Summary</h2>
                                <ul>
                            {
                                cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                               {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>Order Summary</li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>
                                            Total
                                        </strong>
                                        </div>
                                    <div>${cart.totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button type="button" className="primary block" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
