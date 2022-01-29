import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} =cart;
    if (!shippingAddress){
        props.history.push("/shipping")
    }
    const [paymentMethod,setPaymentMethod] = useState("Paypal");
    const dispatch = useDispatch(); 
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push("/placeOrder");
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}> 
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" value="Paypal" id="paypal" name="paymentMethod" checked required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                        <input type="radio" value="Stripe" id="paypal" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">Stripe</label>
                    </div>
                </div>
                <button type="submit" className="primary" >Continue</button>
            </form>
        </div>
    )
}
